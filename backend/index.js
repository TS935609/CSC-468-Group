const express = require('express');
const cors =require("cors");

const app =express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    user: "root",
    host: "localhost",
    password: "password",
    database: "LoginSystem"
});

app.post("/register",(req, res) =>{
    const username = req.body.username;
    const password = req.body.password;
    const email = req.body.email;
    db.query(
        "INSERT INTO users (username, password, email) VALUE (?,?,?)",
        [username, password, email],
        (err, result) => {
            console.log(err);
        }
    );
});

app.post("/login",(req, res) =>{
    const username = req.body.username;
    const password = req.body.password;
    db.query(
        "SELECT * FROM users WHERE username =? AND password = ?",
        [username, password],
        (err, result) => {
            if(err){
                res.send({err: err});
            }
            if (result){
                res.send(result);
            }else{
                res.send({message: "Wrong username or password"});
            }
            
        }
    );
});

app.listen(3001, () => {
    console.log("Server is running");
})