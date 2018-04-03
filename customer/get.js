'use strict';

const AWS = require('aws-sdk');
const dynamodb = new AWS.DynamoDB.DocumentClient();

module.exports.get = (event, context, callback) => {
    const params = {
        TableName: 'mkExpatTestTable',
        Key: { 
            id: event.pathParameters.id
        }
    };

    dynamodb.get(params, (err, result) => {
        if (err) {
            console.error(err);
            callback(new Error('Error: Could not find the specified Customer.'));
            return;
        }
        const response = {
            statusCode: 200,
            headers: {
                "Content-Type" : "application/json",
                "Access-Control-Allow-Origin" : "*",
                "Access-Control-Allow-Credentials" : "true"
            },
            body: JSON.stringify(result.Item)
        };
        callback(null, response);
    });

};