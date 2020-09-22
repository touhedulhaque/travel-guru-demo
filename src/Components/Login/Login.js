import React, { useContext, useState } from 'react';
import { Button } from '@material-ui/core';
import { FcGoogle } from "react-icons/fc";
import * as firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';
import { UserContext } from '../../App';
import { useHistory, useLocation } from 'react-router-dom';
import './Login.css';
import fbIcon from '../Images/Icon/fb.png';


const Login = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const history = useHistory();
    const location = useLocation();
    const { from } = location.state || { from: { pathname: "/" } };

    if (firebase.apps.length === 0) {
        firebase.initializeApp(firebaseConfig);
    }


    const handleGoogleSignIn = () => {

        const googleProvider = new firebase.auth.GoogleAuthProvider();

        firebase.auth().signInWithPopup(googleProvider)
            .then(result => {
                const { displayName, email } = result.user;
                const signedInUser = {
                    isSignedIn: true,
                    name: displayName,
                    email: email
                };
                setLoggedInUser(signedInUser);
                history.replace(from);

            }).catch(error => {
                const errorMessage = error.message;
                console.log(errorMessage);
            });
    }
    const handleSignedOut = () => {
        firebase.auth().signOut()
            .then(response => {
                const signedOutUser = {
                    isSignedIn: false,
                    name: '',
                    email: ''
                }
                setLoggedInUser(signedOutUser)
            }).catch(error => {
                console.log(error);
            });
    }

    const handleBlur = (e) => {
        let isFieldValid = true;
        if (e.target.name === 'email') {
            isFieldValid = /\S+@\S+\.\S+/.test(e.target.value);

        }
        if (e.target.name === 'password') {
            const isPasswordValid = e.target.value.length > 6;
            const passHasNumber = /\d{1}/.test(e.target.value);
            isFieldValid = isPasswordValid && passHasNumber;
        }

        if (isFieldValid) {
            const newUserInfo = { ...loggedInUser };
            newUserInfo[e.target.name] = e.target.value;
            setLoggedInUser(newUserInfo);
        }

    }
    const handleSubmit = (e) => {
        // new user //
        if (newUser && loggedInUser.email && loggedInUser.password) {
            firebase.auth().createUserWithEmailAndPassword(loggedInUser.email, loggedInUser.password)
                .then(response => {
                    const newUserInfo = { ...loggedInUser };
                    newUserInfo.error = '';
                    newUserInfo.success = true;
                    setLoggedInUser(newUserInfo);
                    updateUserName(loggedInUser.name);
                })
                .catch(error => {
                    const newUserInfo = { ...loggedInUser };
                    newUserInfo.error = error.message;
                    newUserInfo.success = false;
                    setLoggedInUser(newUserInfo);
                });
        }
        if (!newUser && loggedInUser.email && loggedInUser.password) {
            firebase.auth().signInWithEmailAndPassword(loggedInUser.email, loggedInUser.password)
                .then(response => {
                    const newUserInfo = { ...loggedInUser };
                    newUserInfo.error = '';
                    newUserInfo.success = true;
                    setLoggedInUser(newUserInfo);
                })
                .catch(error => {
                    const newUserInfo = { ...loggedInUser };
                    newUserInfo.error = error.message;
                    newUserInfo.success = false;
                    setLoggedInUser(newUserInfo);
                });
        }
        e.preventDefault();
    }

    const [newUser, setNewUser] = useState(false);
    const updateUserName = name => {
        const user = firebase.auth().currentUser;

        user.updateProfile({
            displayName: name,
        }).then(function () {
            // Update successful.
        }).catch(function (error) {
            console.log(error);
        });
    }
    const fbProvider = new firebase.auth.FacebookAuthProvider();

    const handleFbSignIn = () => {
        firebase.auth().signInWithPopup(fbProvider)
            .then(result => {
                const { displayName, email } = result.user;
                const fbSignedInUser = {
                    isSignedIn: true,
                    name: displayName,
                    email: email
                }
                setLoggedInUser(fbSignedInUser);
                history.replace(from);

            }).catch(error => {
                const errorMessage = error.message;
                console.log(errorMessage)
            });
    }

    const handleFbSignedOut = () => {
        firebase.auth().signOut()
            .then(response => {
                const fbSignedOutUser = {
                    isSignedIn: false,
                    name: '',
                    email: ''
                }
                setLoggedInUser(fbSignedOutUser)
            }).catch(error => {
                console.log(error);
            });
    }

    return (
        <div className="auth-style">
            <hr />
            <h5>Google Authentication</h5>

            {
                loggedInUser.isSignedIn ? <Button onClick={handleSignedOut} variant="contained" color="secondary">
                    Sign-out from Google <FcGoogle />
                </Button> :
                    <Button onClick={handleGoogleSignIn} variant="contained" color="primary">
                        Sign-in via Google <FcGoogle />
                    </Button>
            }
            <hr />
            <h5>Facebook Authentication</h5>

            {
                loggedInUser.isSignedIn ? <Button onClick={handleFbSignedOut} variant="contained" color="secondary" >
                    Sign-Out from Facebook  <img src={fbIcon} alt="" width="40px" />
                </Button> : <Button onClick={handleFbSignIn} variant="contained" >
                        Sign-in via Facebook  <img src={fbIcon} alt="" width="40px" />
                    </Button>
            }

            <hr />
            <h6>Authentication via email and password</h6>

            <input type="checkbox" onChange={() => setNewUser(!newUser)} name="newUser" id="" />
            <label htmlFor="newUser">New User Sign up</label>

            
            <form style={{
                border: '5px solid aqua',
                borderRadius: '10px',
                boxShadow: '0 8px 16px rgba(0,0,0,.9)',
                width: '50%',
                height: '50%',
                padding: '20px',
                justifyContent: 'center',
                textAlign: 'center',
                fontWeight: 'bold'
            }} onSubmit={handleSubmit}>
                {newUser && <input name="name" onBlur={handleBlur} type="text" placeholder="Your Name" />}
                <br />
                <input type="text" name="email" onBlur={handleBlur} placeholder="Your Email Address" required /> <br />
                <input type="password" onBlur={handleBlur} placeholder="Your Password" name="password" id="" required /><br />
                <input type="submit" value={newUser ? 'Sign-up' : 'Sign-In'} />
            </form>
            <p style={{ color: 'red' }}>{loggedInUser.error}</p>
            {loggedInUser.success && <p style={{ color: 'green' }}>User {newUser ? 'Created' : 'logged-in'} Successfully</p>}
        </div>
    );
};

export default Login;