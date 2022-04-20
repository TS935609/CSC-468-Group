import React, {useState} from 'react'
import Axios from 'axios'
import { Link } from 'react-router-dom'

import '../../App.css'

export default function SignInPage() {
    const [userName, setUserName]= useState('');
    const [password, setPassword]= useState('');

    const login = () => {
        Axios.post('http://localhost:3001/login', {
            username: userName,
            password: password,
        } ).then((response)=> {
            console.log(response);
        });
    }
    return (
        <div className="text-center m-5-auto">
            <h2>Sign in to us</h2>
            <form action="/home">
                <p>
                    <label>Username or email address</label><br/>
                    <input type="text" name="first_name" onChange={(e)=>{setUserName(e.target.value);}} required />
                </p>
                <p>
                    <label>Password</label>
                    <Link to="/forget-password"><label className="right-label">Forget password?</label></Link>
                    <br/>
                    <input type="password" name="password" onChange={(e)=>{setPassword(e.target.value);}} required />
                </p>
                <p>
                    <button id="sub_btn" type="submit" onClick={login}>Login</button>
                </p>
            </form>
            <footer>
                <p>First time? <Link to="/register">Create an account</Link>.</p>
                <p><Link to="/">Back to Homepage</Link>.</p>
            </footer>
        </div>
    )
}
