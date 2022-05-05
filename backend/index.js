import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import redis from "redis";
import db from "./config/Database.js";
import router from "./routes/index.js";
dotenv.config();
const app = express();
 
app.use(cors({ credentials:true, origin:'http://localhost:3000' }));
app.use(cookieParser());
app.use(express.json());
app.use(router);

//const redis = require('redis');
const client = redis.createClient(6379, 'redis');
client.on("error", function (err) {
    console.error("Redis error", err);
});

const redisPublisher = client.duplicate();


app.get('/json', async (req, res) => {
    client.hlen('wallet', (err, coins) => {
        client.get('hashes', (err, hashes) => {
            var now = Date.now() / 1000;
            res.json( {
                coins: coins,
                hashes: hashes,
                now: now
            });
        });
    });
});
app.use(express.static('files'));
 
app.listen(5000, ()=> console.log('Server running at port 5000'));