'use strict';
const express = require('express');
const app = express();
const url = require('url');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
app.use(express.static(path.join(__dirname, '/scripts')));
app.use(express.static(path.join(__dirname, '/style')));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/index.html', function(request, response) {
    let pathname = url.parse(request.url).pathname;
    fs.readFile(pathname.substr(1), function(err, data) {
        if (err) {
            console.log(err);
            response.writeHead(404, { 'Content-Type': 'text/html' });
        } else {
            response.writeHead(200, { 'Content-Type': 'text/html' });
            response.write(data.toString());
        }
        response.end();
    });
});
app.get('/getDataFromDB', function(request, response) {
    console.log('getDataFromDB......');
    // response.setHeader("Access-Control-Allow-Origin", "*");
    // response.setheader("Access-Control-Allow-Methods", "GET, POST");
    //response.setHeader('Content-Type', 'application/json');
    MongoClient.connect('mongodb://localhost:27017/swloanstar', function(err, db) {
        if (err) {
            console.log(err);
            throw err;
        }
        var document1 = db.collection('countrys').find();
        var responseData = [];
        document1.each(function(err, doc) {
            if (doc != null) {
                responseData.push(doc);
            } else if (doc == null) {
                response.json(responseData);
                response.end();
            }
        });
    });
});
app.post('/retrieve', function(request, response) {
    console.log('retrieve......');
    var country = request.body.country;
    var state = request.body.state;
    var city = request.body.city;
    console.log("country:  " + country + "    state:  " + state + "   city:  " + city);
    MongoClient.connect('mongodb://localhost:27017/swloanstar', function(err, db) {
        if (err) {
            console.log(err);
            throw err;
        }
        var document1;
        if (country != '' && state === '' && city === '') {
            console.log('if...');
            document1 = db.collection('scriptData').find({ "country": country });
        } else if (country != '' && state != '' && city === '') {
            console.log('else if...');
            document1 = db.collection('scriptData').find({ $and: [{ "country": country }, { "state": state }] });
        } else {
            console.log(' else...');
            document1 = db.collection('scriptData').find({ $and: [{ "country": country }, { "state": state }, { "city": city }] });
        }
        var responseData = [];
        document1.each(function(err, doc) {
            if (doc != null) {
                console.log('scriptData  ' + JSON.stringify(doc));
                responseData.push(doc);
            } else if (doc == null) {
                response.json(responseData);
                response.end();
            }
        });
    });
});
var server = app.listen(2017);
console.log("server started with port 2017..");
/**
 * logdetails data..
 */
/** 
 * {
        "_id" : 1,
        "country" : "Australia",
        "state" : "New South Wales",
        "city" : "Sydney",
        "scriptID" : "100",
        "scriptName" : "getdata",
        "scriptDescription" : "get data from db",
        "executionResults" : "success",
        "executionDuration" : "10min"
}
{
        "_id" : 2,
        "country" : "Australia",
        "state" : "New South Wales",
        "city" : "Sydney",
        "scriptID" : "100",
        "scriptName" : "hello",
        "scriptDescription" : "h r u ",
        "executionResults" : "falied",
        "executionDuration" : "20min"
}
{
        "_id" : 3,
        "country" : "Australia",
        "state" : "New South Wales",
        "city" : "Sydney",
        "scriptID" : "100",
        "scriptName" : "wt r u doing",
        "scriptDescription" : "nothing",
        "executionResults" : "success",
        "executionDuration" : "10min"
}
{
        "_id" : 4,
        "country" : "India",
        "state" : "Maharashtra",
        "city" : "Pune",
        "scriptID" : "1003",
        "scriptName" : "who r u",
        "scriptDescription" : "naga",
        "executionResults" : "success",
        "executionDuration" : "10min"
}
{
        "_id" : 5,
        "country" : "India",
        "state" : "Maharashtra",
        "city" : "Pune",
        "scriptID" : "1004",
        "scriptName" : "who r u",
        "scriptDescription" : "naga",
        "executionResults" : "success",
        "executionDuration" : "10min"
}
*/