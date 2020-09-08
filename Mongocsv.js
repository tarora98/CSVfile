// Retrieve
const csv = require('csv-parser');
const fs = require('fs');

var address = "103.216.82.155";
var i = 0, result = 0, num = 0, str = " ", j = 3;
const MongoClient = require('mongodb').MongoClient;
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

MongoClient.connect("mongodb://localhost:27017/customer", function (err, client) {
    if (err) {
        return console.dir(err);
    }
    const db = client.db('customer');
    searchData(db, function () {
        client.close();
        // console.log(db.collection);
    });
}
);

const searchData = function (db, callback) {
    // Get the documents collection
    const collection = db.collection('customer');

    collection.find({ $and: [{ result: { $lt: item.TO } }, { result: { $gt: item.FOR } }] }).toArray(function (err, docs) {
        assert.equal(err, null);
        console.log(result);
        console.log(doc);
    });
    callback(docs);
};
