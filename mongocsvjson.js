const mongodb = require("mongodb").MongoClient;
const csvtojson = require("csvtojson");

// let url = "mongodb://username:password@localhost:27017/";
let url = "mongodb://localhost:27017/";
// Retrieve
const csv = require('csv-parser');
const fs = require('fs');

var address = "103.216.82.155";
var i = 0, result = 0, num = 0, str = " ", j = 3;
const assert = require('assert');
// Connect to the db

while (true) {
    if (address.charAt(i) == '.') {
        result += (num) * Math.pow(256, j);
        num = 0;
        j--;
        str = "";
    }
    else {
        str += address.charAt(i);
        num = parseInt(str);
    }
    i++;
    if (i == address.length) {
        result += (num) * Math.pow(256, j);
        break;
    }
}
csvtojson()
    .fromFile("IP2LOCATION-LITE-DB1.csv")
    .then(csvData => {
        csvData.forEach(function (item) {
            mongodb.connect(
                url,
                { useNewUrlParser: true, useUnifiedTopology: true },
                (err, client) => {
                    if (err) throw err;
                    client
                        .db("customer")
                        .collection("customer")
                        .find({ $and: [{ result: { $lt: item.TO } }, { result: { $gt: item.FOR } }] }, (err, docs) => {
                            console.log(result + "HEH");
                            console.log("HEL");
                            client.close();
                        });
                }
            );
        })
    });
