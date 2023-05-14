import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../firebase";

const Register = () => {

    const history = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (name && email && password) {
            setLoading(true);
            createUserWithEmailAndPassword(auth, email, password)
                .then(async (res) => {
                    console.log(res)
                    setLoading(false);
                    let user = res?.user;
                    await updateProfile(user, {
                        displayName: name
                    })
                    history('/home');
                })
                .catch(error => {
                    console.log(error)
                    setErrorMsg(error?.message)
                    setLoading(false);
                })
        }
        else {
            setErrorMsg("Please fill all the required fields.")
        }

    };

    return (
        <div className="formContainer">
            <div className="formWrapper">
                <span className="logo">Register</span>
                <form onSubmit={handleSubmit}>
                    <input type="text" placeholder="name" value={name} onChange={(e) => {
                        setName(e.target.value)
                        setErrorMsg("")
                    }} />
                    <input type="email" placeholder="email" value={email} onChange={(e) => {
                        setEmail(e.target.value)
                        setErrorMsg("")
                    }} />
                    <input type="password" placeholder="password" value={password} onChange={(e) => {
                        setPassword(e.target.value)
                        setErrorMsg("")
                    }} />
                    <span className="error">{errorMsg}</span>
                    <button disabled={loading}>{loading ? 'loading...' : 'Sign up'}</button>
                </form>
                <p onClick={() => history("/login")}>
                    You do have an account? <u>Login</u>
                </p>
            </div>
        </div>
    );
};

export default Register;