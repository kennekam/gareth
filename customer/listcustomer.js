'use strict';

const AWS = require('aws-sdk');

const dynamodb = new AWS.DynamoDB.DocumentClient();
//const dynamodb = new AWS.DynamoDB({region: 'us-east-1', apiVersion: '2012-08-10'});
const params = {
    TableName: 'mkExpatTestTable'
};
//exports.handler = function(event, context, callback) {
module.exports.list = (event, context, callback) => {
    dynamodb.scan(params, (err, result) => {
        if (err) {
            //console.error(error);
            console.log('Could not retrieve any Customers. Error:', JSON.stringify(err, null, 2));
            //callback(new Error('Could not retrieve any Customers'));
            callback(err, null);
            return;
        };
    const response = {
        statusCode: 200,
        headers: {
            "Access-Control-Allow-Origin" : "*",
            "Access-Control-Allow-Credentials" : true,
            "Content-Type": "application/json"
            //For CORS, I tested with adding custom headers, as well as simply enabling just CORS to True
            //Reminder: Remove the custom headers, if CORS being managed via YML or API Gateway.
        },
        body: JSON.stringify(result.Items)
    };
    callback(null, response);
    });
};