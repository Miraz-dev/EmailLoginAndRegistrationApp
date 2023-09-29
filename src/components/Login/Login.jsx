// import React from 'react';

import { sendEmailVerification, sendPasswordResetEmail, signInWithEmailAndPassword } from "firebase/auth";
import auth from "../../firebase/firebase.config";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";

const Login = () => {

    const [registerError, setRegisterError] = useState("");
    const [success, setSuccess] = useState("");
    const emailRef = useRef(null);
    const [username, setUserName] = useState(null);

    const handleLogin = (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;
        console.log(email, password);

        // reset User
        setRegisterError("");
        setSuccess("");

        signInWithEmailAndPassword(auth, email, password)
            .then(result => {
                console.log(result.user);
                if(result.user.emailVerified){
                    setSuccess("User Logged in successfully.")
                    setUserName(result.user.displayName);
                }
                else{
                    alert("Please verify your email.");
                    sendEmailVerification(result.user)
                    .then(() => {
                        alert("Please check your email and verify your account")
                    })
                }
            })
            .catch(error => {
                const errMessage = error.message;
                setRegisterError(errMessage);
            })
    }


    const handleForgetPassword = () => {
        const email = emailRef.current.value;
        if(!email){
            console.log("send reset email: ", emailRef.current.value);
            return;
        }else if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)){
            setRegisterError("Invalid Email Format");
            return;
        }

        // send validation email
        sendPasswordResetEmail(auth, email)
            .then(() => {
                alert("Please check your email: ", email);
            })
            .catch(error =>{
                console.log(error);
            })
    }


    return (
        <div>
            <div className="hero min-h-screen bg-base-200">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <div className="text-center lg:text-left">
                        <h1 className="text-5xl font-bold">{username ? `Welcome ${username}` : "Login Now"}</h1>
                        <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
                    </div>
                    <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                        <div className="card-body">
                            <form onSubmit={handleLogin}>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Email</span>
                                    </label>
                                    <input ref={emailRef} type="email" placeholder="email" name="email" className="input input-bordered" />
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Password</span>
                                    </label>
                                    <input type="password" placeholder="password" name="password" className="input input-bordered" />
                                    <label className="label">
                                        <a
                                            onClick={handleForgetPassword} 
                                            href="#" 
                                            className="label-text-alt link link-hover"
                                        >Forgot password?</a>
                                    </label>
                                </div>
                                <div className="form-control mt-6">
                                    <button className="btn btn-primary">Login</button>
                                </div>
                            </form>
                            {
                                registerError && <p className="text-rose-400">{registerError}</p>
                            }
                            {
                                success && <p className="text-green-500">{success}</p>
                            }
                            <p>New here? Please <Link to={'/register'}>Register</Link></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;