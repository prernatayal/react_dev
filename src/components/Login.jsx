import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase"

const Login = ({ setLogin }) => {

    const history = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (email && password) {
            setLoading(true);
            signInWithEmailAndPassword(auth, email, password)
                .then(res => {
                    console.log(res);
                    setLoading(false);
                    history("/home");
                })
                .catch((error) => {
                    console.log(error);
                    setLoading(false);
                    setErrorMsg(error?.message);
                })
        }
        else {
            setErrorMsg("Please fill all the required fields.")
        }

    };
    return (
        <div className="formContainer">
            <div className="formWrapper">
                <span className="logo">Login</span>
                <form onSubmit={handleSubmit}>
                    <input type="email" placeholder="email" value={email} onChange={(e) => {
                        setEmail(e.target.value)
                        setErrorMsg("")
                    }} />
                    <input type="password" placeholder="password" value={password} onChange={(e) => {
                        setPassword(e.target.value)
                        setErrorMsg("")
                    }} />
                    <span className="error">{errorMsg}</span>
                    <button disabled={loading}>{loading ? 'logging in...' : 'Sign in'}</button>
                </form>
                <p onClick={() => history("/")}>You don't have an account? <u>Register</u></p>
            </div>
        </div>
    );
};

export default Login;