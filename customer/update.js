'use strict';

const AWS = require('aws-sdk');
const dynamodb = new AWS.DynamoDB.DocumentClient();

module.exports.update = (event, context, callback) => {
    
    const customerData = JSON.parse(event.body);

    const params = {
        TableName: 'mkExpatTestTable',
        Key: { 
            id: event.pathParameters.id
        },
        UpdateExpression: "SET firstname = :fn, lastname =:ln, telephone =:tp, gender =:gen, streetname =:strname, streetnumber =:strnum, suburb =:sub, city =:city, country =:country",
        ExpressionAttributeValues: {
            ":fn" : customerData.firstname,
            ":ln" : customerData.lastname,
            ":tp" : customerData.telephone,
            ":gen" : customerData.gender,
            ":strname" : customerData.streetname,
            ":strnum" : customerData.streetnumber,
            ":sub" : customerData.suburb,
            ":city" : customerData.city,
            ":country" : customerData.country
        },
        ReturnValues: "ALL_NEW"
    };

    if (typeof customerData.firstname !== 'string' || typeof customerData.lastname !== 'string') {
        console.error('Invalid input, please try again');
        callback(new Error('Could not update Customer details'));
        return;
    }

    dynamodb.put(params, (err, result) => {
        if (err) {
            console.error(err);
            callback(new Error('Unable to update Customer at this time.'));
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