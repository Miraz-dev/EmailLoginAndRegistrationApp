// import React from 'react';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';

import { createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from "firebase/auth";
import auth from "../../firebase/firebase.config";
import { useState } from "react";
import { Link } from 'react-router-dom';

const Register = () => {
    const [registerError, setRegisterError] = useState("");
    const [success, setSuccess] = useState("");
    const [showPassword, setShowPassowrd] =useState(false);


    const handleRegister = (e) => {
        e.preventDefault();
        const name = e.target.name.value;
        const email = e.target.email.value;
        const password = e.target.password.value;
        const accepted = e.target.terms.checked;
        console.log(name,email, password, accepted);

        // reset User
        setRegisterError("");
        setSuccess("");


        if(password.length < 6) {
            setRegisterError("Password should be more than 6 character long.");
            return;
        }
        else if(!/[A-Z]/.test(password)){
            setRegisterError("Your password should have at least 1 uppercase letter");
            return;
        }
        else if(!accepted){
            setRegisterError("Please accept our terms and conditions.")
            return;
        }

        
        createUserWithEmailAndPassword(auth, email, password)
            .then(result => {
                console.log(result.user);
                setSuccess("User Created Successfully");

                // update Profile(it means setting the users name and other info)
                updateProfile(result.user, {
                    displayName: name,
                    photoURL: "https://example.com/jane-q-user/profile.jpg"
                })
                .then(() => console.log("Profile Updated/created"))
                .catch()

                // Now send verification email:
                sendEmailVerification(result.user)
                    .then(() => {
                        alert("Please check your email and verify your account")
                    })

            })
            .catch(error => {
                console.log(error);
                const errMessage = error.message;
                // const errCode = error.code;
                setRegisterError(errMessage);
            })

    }




    return (
        <div>
            <h2 className="text-2xl my-3 hover:tracking-widest transition-all duration-1000">Please Register.</h2>
            <form className="space-y-2" onSubmit={handleRegister}>
                <input 
                    className="p-2 w-full border-green-600 border-2 text-green-200 tracking-wider rounded-lg shadow-lg focus:shadow-green-500" 
                    type="text" placeholder="Your Name.." name="name" id="" required/>
                <br />
                <input 
                    className="p-2 w-full border-green-600 border-2 text-green-200 tracking-wider rounded-lg shadow-lg focus:shadow-green-500" 
                    type="email" placeholder="Your email address.." name="email" id="" required/>
                <br />
                <div className="relative">
                    <input 
                        className="p-2 w-full border-green-600 border-2 text-green-200 tracking-wider rounded-lg shadow-lg focus:shadow-green-500" 
                        type={showPassword ? "text" : "password"} 
                        placeholder="Your password.." name="password" id="" required
                    />
                    <span 
                        onClick={() => setShowPassowrd(!showPassword)}
                        className="text-base absolute right-2 top-[50%] -translate-y-1/2 hover:text-lg "
                        >
                            {showPassword ? <AiFillEyeInvisible /> :<AiFillEye />}
                    </span>
                </div>
                <br />
                <div className="text-left flex items-center gap-1">
                    <input type="checkbox" name="terms" id="termsID" />
                    <label htmlFor="termsID">Accept our <a href="">terms and conditions</a></label>
                </div>
                <br />
                <input className="btn btn-outline btn-success w-full hover:tracking-[0.7em] transition-all duration-1000" type="submit" value="Register" />
            </form>
            {
                registerError && <p className="text-rose-400">{registerError}</p>
            }
            {
                success && <p className="text-green-500">{success}</p>
            }
            <p>Already have an account? <Link to={'/login'}>Login</Link></p>
        </div>
    );
};

export default Register;