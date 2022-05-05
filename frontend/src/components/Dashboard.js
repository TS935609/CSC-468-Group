/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react'
import axios from 'axios';
import jwt_decode from "jwt-decode";
import { useHistory } from 'react-router-dom';

 
const Dashboard = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [token, setToken] = useState('');
    const [expire, setExpire] = useState('');
    const [hashes, setHashes] = useState('');
    const [thecoin, setTheCoin] = useState('');
    const [time, setTime] = useState('');
    const [speed, setSpeed] = useState(0);
    const history = useHistory();

    

    useEffect(() => {
        refreshToken();
        getUsers();
    }, []);

    useEffect(() => {
        
        fetchTheData();
       
    },[ time ]);

    const fetchTheData = async() => {
        try{
            const response = await axios.get('/api/json');
            setTheCoin (response.data.coins);
            setTime(response.data.now);
            setHashes(response.data.hashes);
            console.log(response.data);    
    
        } catch (error){
            if(error.response){
                console.log("ERROR DURING DATA FETCHING TO REDIS!");
            }
        }
    }

 
    const refreshToken = async () => {
        try {
            const response = await axios.get('/api/token');
            setToken(response.data.accessToken);
            const decoded = jwt_decode(response.data.accessToken);
            setName(decoded.name);
            setEmail(decoded.email)
            setExpire(decoded.exp);
        } catch (error) {
            if (error.response) {
                history.push("/");
            }
        }
    }
 
    const axiosJWT = axios.create();
 
    axiosJWT.interceptors.request.use(async (config) => {
        const currentDate = new Date();
        if (expire * 1000 < currentDate.getTime()) {
            const response = await axios.get('/api/token');
            config.headers.Authorization = `Bearer ${response.data.accessToken}`;
            setToken(response.data.accessToken);
            const decoded = jwt_decode(response.data.accessToken);
            setName(decoded.name);
            setExpire(decoded.exp);
        }
        return config;
    }, (error) => {
        return Promise.reject(error);
    });
 
    const getUsers = async () => {
        const response = await axiosJWT.get('/api/users', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
    }
 

   
    return (
        <div className="container block mt-5">
            <div className='is-centered'>
            
            <h1 className='is-size-3 block'>Welcome To Red Team!!</h1>
            <h1 className='is-size-4'>Here is some of your information:</h1>
            <h1 className='is-size-5'>                       Your name: {name}</h1>
            <h1 className='is-size-5'>                      Your email: {email}</h1>
            <h1 className='is-size-5'>                      Rams Coins: {thecoin}</h1>
            <h1 className='is-size-5'>To stop mining Rams Coins, simply logout. Your coins will be saved the database when you login again.</h1>
            </div>                
        </div>
          )
}
 
export default Dashboard