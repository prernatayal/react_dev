import React, { useEffect, useState } from 'react'
import { auth } from '../firebase';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const Home = () => {

    const history = useNavigate();

    const [userName, setUserName] = useState("");
    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");

    useEffect(() => {
        auth.onAuthStateChanged((user) => {
            if (user) {
                setUserName(user?.displayName);
            }
            else {
                setUserName("");
            }
            console.log(user, "line no 1999");
        })
    }, [])

    const handleLogout = () => {

        setLoading(true);
        signOut(auth)
            .then(res => {
                console.log(res);
                setLoading(false);
                history("/");
            })
            .catch((error) => {
                console.log(error);
                setLoading(false);
                setErrorMsg(error?.message);
            })
    }

    return (
        <div className="formContainer">
            <div className="formWrapper">
                <span className="logo">Hello {userName ? userName : 'user'}! Welcome to the homepage.</span>
                <span className="error">{errorMsg}</span>
                <button onClick={handleLogout} disabled={loading}>{loading ? 'logging out...' : 'Logout'}</button>
            </div>
        </div>
    )
}
export default Home;