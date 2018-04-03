'use strict';

const AWS = require('aws-sdk');
const dynamodb = new AWS.DynamoDB.DocumentClient();

module.exports.delete = (event, context, callback) => {
    const params = {
        TableName: 'mkExpatTestTable',
        Key: {
            id : event.pathParameters.id
        }
    };

    dynamodb.deleteItem(params, function(err, data) {
        if (err) {
            console.log(err);
            callback(new Error('Unable to Delete Customer'));
            //return;
        } else {
            /*const response = {
            statusCode: 200,
            headers: {
                "Content-Type" : "application/json",
                "Access-Control-Allow-Origin" : "*",
                "Access-Control-Allow-Credentials" : "true"
            },
            body: JSON.stringify({})
        };*/
        callback(null, data);
        }   
    });
};