import React, {useState} from 'react'
import {Link} from "react-router-dom";
import {auth, firestore} from "../../firebase/firebase";
import {setUserId} from "../../redux/reducers/profileReducer";

const SignIn = props => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const onChangeHandler = (event) => {
        const {name, value} = event.currentTarget;
        if(name === 'userEmail') {
            setEmail(value);
        }
        else if(name === 'userPassword'){
            setPassword(value);
        }
    };

    // const getPosts = (e) => {
    //     e.preventDefault()
    //     const docRef = firestore.collection("users").doc(
    //         "M2lbegjVJpYKGrXRJzm9waEIOfi1");
    //
    //     docRef.get().then(function(doc) {
    //         if (doc.exists) {
    //             console.log("Document data:", doc.data());
    //         } else {
    //             // doc.data() will be undefined in this case
    //             console.log("No such document!");
    //         }
    //     }).catch(function(error) {
    //         console.log("Error getting document:", error);
    //     });
    // }

    const handleSignIn = (event, email, password) => {
        debugger
        event.preventDefault();
            if (email.length < 4) {
                alert('Please enter an email address.');
                return;
            }
            if (password.length < 4) {
                alert('Please enter a password.');
                return;
            }

            auth.signInWithEmailAndPassword(email, password)
                .then((response) => {
                    console.log(response)
                    props.dispatch(setUserId(auth.currentUser.uid))
                } )
                .catch(function(error) {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    if (errorCode === 'auth/wrong-password') {
                        alert('Wrong password.');
                    } else {
                        alert(errorMessage);
                    }
                    console.log(error);
                });
        }

    return (
        <div>
            <h1>Sign In</h1>
            <div>
                <form>
                    <label htmlFor="userEmail">Email:</label>
                    <input
                        type="email"
                        name="userEmail"
                        value = {email}
                        placeholder="E.g: my.name@gmail.com"
                        id="userEmail"
                        onChange={(event) => onChangeHandler(event)}
                    />
                    <br/>
                    <label htmlFor="userPassword">Password:</label>
                    <input
                        type="password"
                        name="userPassword"
                        value = {password}
                        placeholder="Your Password"
                        id="userPassword"
                        onChange = {(event) => onChangeHandler(event)}
                    />
                    <button onClick={(event) => handleSignIn(event, email, password)}>Sign in</button>
                </form>
                <p>
                    Don't have an account?{" "}
                    <Link to={'./sign-up'}>Sign up here</Link>{" "}
                    <br />{" "}
                    <Link to={'./password-reset'}>Forgot Password?</Link>
                </p>
            </div>
        </div>
    )
}

export default SignIn