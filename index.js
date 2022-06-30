const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const mysql = require("mysql");

// parse application/json
app.use(bodyParser.json());

// create database connection
const conn = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "restful_db",
});

// connect to database
conn.connect((err) => {
    if (err) throw err;
    console.log("Mysql Connected...");
});

// tampilkan semua data stok
app.get("/api/bloodstocks", (req, res) => {
    let sql = "SELECT * FROM bloodstocks";
    let query = conn.query(sql, (err, results) => {
        if (err) throw err;
        res.send(JSON.stringify({ status: 200, error: null, response: results }));
    });
});

// tampilkan data stok berdasarkan golongan darah
app.get("/api/bloodstocks/:goldar", (req, res) => {
    let sql =
        "SELECT stocks FROM bloodstocks WHERE goldar='" + req.params.goldar + "'";
    let query = conn.query(sql, (err, results) => {
        if (err) throw err;
        res.send(JSON.stringify({ response: results }));
    });
});

// tambahkan data stok baru
app.post("/api/bloodstocks", (req, res) => {
    let data = {
        goldar: req.body.goldar,
        stocks: req.body.stocks,
    };
    let sql = "INSERT INTO bloodstocks SET ?";
    let query = conn.query(sql, data, (err, results) => {
        if (err) throw err;
        res.send(JSON.stringify({ status: 200, error: null, response: results }));
    });
});

// edit data stok berdasarkan golongan darah
app.put("/api/bloodstocks/:goldar", (req, res) => {
    let sql =
        "UPDATE bloodstocks SET stocks='" +
        req.body.stocks +
        "' WHERE goldar=" +
        req.params.goldar;
    let query = conn.query(sql, (err, results) => {
        if (err) throw err;
        res.send(JSON.stringify({ status: 200, error: null, response: results }));
    });
});

// delete data stok berdasarkan golongan darah
app.delete("/api/bloodstocks/:goldar", (req, res) => {
    let sql = "DELETE FROM bloodstocks WHERE goldar=" + req.params.goldar + "";
    let query = conn.query(sql, (err, results) => {
        if (err) throw err;
        res.send(JSON.stringify({ status: 200, error: null, response: results }));
    });
});

// server listening
app.listen(3000, () => {
   console.log("Server started on port 3000...");
});
