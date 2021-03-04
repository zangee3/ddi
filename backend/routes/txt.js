const express = require("express");
const router = express.Router();
const request = require("request");
const fs = require("fs");
const connection = require("./db");
const envData = require("../env.json");
const config = envData[process.env.NODE_ENV];

router.post("/addTXTRecord", function (req, res, next) {
    const bodyData = req.body;
    bodyData.forEach((b) => {
        const name = b.name;
        const text = b.text;

        return connection.query(
            "INSERT INTO txt (name, text) VALUES ('" +
            name +
            "', '" +
            text +
            "')",
            (err, result) => {
                if (err) {
                    console.log(err);
                    return res.status(400).json(err);
                }
            }
        );
    })
    return res.status(200).json(req.body);
});

router.get("/getTXTRecords", function (req, res, next) {
    // return res.status(400).json({ a: "hello" });
    return connection.query("SELECT * from txt", (err, result) => {
        if (err) {
            console.log(err);
            return res.status(400).json(err);
        }
        return res.status(200).json(result);
    });
});

router.post("/deleteTXTRecord", function (req, res, next) {
    const id = req.body.id;
    return connection.query(
        "DELETE FROM txt WHERE id = '" + id + "'",
        function (err, result) {
            if (err) throw err;
            return res.status(200).json({
                success: true,
                result: "sucess",
                message: "Number of records deleted: " + result.affectedRows,
            });
        }
    );
});

router.post("/updateTXTRecord", function (req, res, next) {
    const name = req.body.data.name;
    const text = req.body.data.text;
    const id = req.body.id;

    const sql =
        "UPDATE txt SET name = '" +
        name +
        "', text = '" +
        text +
        "'  WHERE id = '" +
        id +
        "'";

    return connection.query(sql, (err, result) => {
        if (err) {
            console.log(err);
            return res.status(400).json(err);
        }
        return res.status(200).json(req.body);
    });
});

module.exports = router;
