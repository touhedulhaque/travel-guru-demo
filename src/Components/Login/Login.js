import React, { useContext } from 'react';
import { Button } from '@material-ui/core';
import { FcGoogle } from "react-icons/fc";
import * as firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';
import { UserContext } from '../../App';
import { useHistory, useLocation } from 'react-router-dom';

const Login = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const history = useHistory();
    const location = useLocation();
    const { from } = location.state || { from: { pathname: "/" } };

    if (firebase.apps.length === 0) {
        firebase.initializeApp(firebaseConfig);
    }



    const handleGoogleSignIn = () => {
        var provider = new firebase.auth.GoogleAuthProvider();

        firebase.auth().signInWithPopup(provider)
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

    const handleChange = (e) => {
        console.log(e.target.value)

    }

    const handleSubmit = () => {

    }
    return (
        <div>
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
            <h6>Authentication via email and password</h6>

            <form onSubmit={handleSubmit}>
                <input type="text" name="email" onChange={handleChange} placeholder="Your Email Address" required /> <br />
                <input type="password" onChange={handleChange} placeholder="Your Password" name="password" id="" required /><br />
                <input type="password" onChange={handleChange} placeholder="confirm password" name="confirm-password" id="" required /><br />
                <input type="submit" value="Submit" />
            </form>
        </div>
    );
};

export default Login;