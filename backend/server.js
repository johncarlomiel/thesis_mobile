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
                if (results.length > 0) {
                    let payload = {
                        id: results[0].id,
                        username: results[0].username,
                        name: results[0].name
                    }
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

app.post("/api/submitResult", verifyToken, (req, res) => {

    let codes = [];
    req.body.result.forEach(element => {
        codes.push([req.userData.id, element]);
    });

    pool.getConnection((err, connection) => {
        if (err) throw err;

        let query = connection.query('INSERT INTO user_code (user_id, code) VALUES ?', [codes], (error, results, fields) => {
            if (error) throw error;

            res.status(200).json({ hetto: "wer" })



        });
        console.log(query.sql)
    });

});



app.get("/api/checkSession", verifyToken, (req, res) => {
    res.status(200).json(req.userData);
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
                req.userData = authData;
                next();
            }
        });


    } else {
        //Forbidden
        res.status(403).json({ message: "Forbidden" })
    }
}

app.get('/api/getMyCode', verifyToken, (req, res) => {
    console.log(req.userData)

    function getCodes(callback) {
        pool.getConnection((err, connection) => {
            if (err) throw err;
            let holder = [];

            const query = connection.query(`SELECT code FROM user_code WHERE user_id=${req.userData.id}`, (error, results, fields) => {
                if (error) throw error;

                results.forEach((element) => {
                    const query = connection.query('SELECT * from `code` WHERE `code` = ?', [element.code], (error, results, fields) => {
                        if (error) throw error;
                        holder.push({
                            name: element.code,
                            result: results
                        })
                    })

                });

                setTimeout(() => callback(holder), 1000)



            });










        });
    }

    getCodes((data) => {
        res.status(200).json(data)
    })

});



app.listen(5000, () => {
    console.log("Server started at port 5000")
});
