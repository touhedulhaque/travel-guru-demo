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
                debugger;
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

    const  handleFbSignIn = () =>{
        firebase.auth().signInWithPopup(fbProvider)
        .then(function(result) {
            // This gives you a Facebook Access Token. You can use it to access the Facebook API.
            var token = result.credential.accessToken;
            // The signed-in user info.
            var user = result.user;
            console.log('fb user after sign-in', user);
          }).catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // The email of the user's account used.
            var email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            var credential = error.credential;
            // ...
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
            <Button onClick={handleFbSignIn} variant="contained" >
                Sign-in via Facebook  <img src={fbIcon} alt="" width="40px" />
            </Button>




            <hr />
            <h6>Authentication via email and password</h6>

            <input type="checkbox" onChange={() => setNewUser(!newUser)} name="newUser" id="" />
            <label htmlFor="newUser">New User Sign up</label>



            <form onSubmit={handleSubmit}>
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