const express = require("express");
const jwt = require('jsonwebtoken');
const mysql = require("mysql")
const cors = require('cors');

var pool = mysql.createPool({
    connectionLimit: 10000,
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'survey'
});

const app = express();
app.use(express.json());
app.use(cors())


app.post("/api/register", (req, res) => {

    pool.getConnection((err, connection) => {
        connection.query(`SELECT * FROM users WHERE username="${req.body.username}"`, (error, results, fields) => {
            if (results.length == 0) {
                connection.query("INSERT INTO users SET ?", {
                    username: req.body.username, password: req.body.password, name: req.body.name
                },
                    (error, results, fields) => {
                        if (error) {
                            throw error;
                        }
                        res.status(200).json({ message: "Register success", status: 200 })
                    });
            } else {
                res.status(403).json({ message: "Username already taken" })

            }
        });


    });

});

app.post("/api/login", (req, res) => {

    pool.getConnection((err, connection) => {
        if (err) throw err;

        connection.query("SELECT * FROM `users` WHERE `username` = ? AND `password` = ?",
            [req.body.username, req.body.password],
            (error, results, fields) => {
                if (error) throw error;
                let payload = {
                    id: results[0].id,
                    username: results[0].username,
                    name: results[0].name
                }
                if (results.length > 0) {

                    jwt.sign(payload, "shhhhhh", { expiresIn: '1d' }, (err, token) => {
                        if (err) throw err;

                        res.json(token);

                    });
                } else {
                    res.status(400).json({ message: "Invalid username or password" })
                }
            });


    });

});


app.get("/api/checkSession", verifyToken, (req, res) => {
    res.status(200).json(req.data);

});

function verifyToken(req, res, next) {
    //Get auth header value
    const bearerHeader = req.headers["authorization"];

    if (typeof bearerHeader !== 'undefined') {
        const bearer = bearerHeader.split(" ")[1];

        req.token = bearer;

        jwt.verify(bearer, 'shhhhhh', (err, authData) => {
            if (err) {
                res.status(403).json({ message: "Forbidden" })
                throw err
            } else {
                req.data = authData;
                next();
            }
        });


    } else {
        //Forbidden
        res.status(403).json({ message: "Forbidden" })
    }
}



app.listen(5000, () => {
    console.log("Server started at port 5000")
});
