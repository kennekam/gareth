'use strict';

//I originally used aws-sdk uuid library to generate my random UUID for the customer's ID field
//Update: Eventually decided to use time tick's instead. But seeing as this table already has the primary Key
//which is using a GUID format, this verion is still using the GUID.
const uuid = require('uuid');
const AWS = require('aws-sdk');
const milisecid = new Date().getTime();
//const dynamodb = new AWS.DynamoDB.DocumentClient();
const dynamodb = new AWS.DynamoDB({region: 'us-east-1', apiVersion: '2012-08-10'});

module.exports.create = (event, context, callback) => {
    
    const customerData = JSON.parse(event.body);
    //const customerData = JSON.stringify(event.body); //Ignore: Experimented with parsing JSON into String, as well as creating JSON objects
    /*if (typeof data.firstname !== 'string' || typeof data.lastname !== 'string') {
        console.error('Validation Failed, only valid string parameters will be accepted!');
        callback(new Error('Couldn\'t create a new Customer in the DB Table.'));
       return;
    }*/

    const params = {
        TableName: 'mkExpatTestTable',
        Item: {
            "id" : { S: uuid.v1() },
            "firstname" : { S: customerData.firstname },
            "lastname" : { S: customerData.lastname },
            "telephone" : { S: customerData.telephone },
            "gender" : { S: customerData.gender },
            "streetname" : { S: customerData.streetname },
            "streetnumber" : { N: customerData.streetnumber },
            "suburb" : { S: customerData.suburb },
            "city" : { S: customerData.city },
            "country" : { S: customerData.country }
            //Gereth: Uncomment the below to seed a table row with some static demo content
            /*"id": milisecid,
            "firstname" : "Pieter",
            "lastname" : "Coetzee",
            "telephone": "+27210000000",
            "gender": "male",
            "streetname": "Testing Street",
            "streetnumber": "23",
            "suburb": "Century City",
            "city": "Cape Town",
            "country": "South Africa"*/
        }
    };


    dynamodb.put(params, (err, result) => {
        if (err) {
            console.error(err);
            callback(new Error('Could not create new Customer.'));
            //return;
        } else {
            const response = {
            statusCode: '200',
            headers: {
                "Content-Type" : "application/json",
                "Access-Control-Allow-Origin" : "*",
                "Access-Control-Allow-Credentials" : "true"              
            },
            body: JSON.stringify(result.Item)
            };
            callback(null, response);
        }
        //Reminder: Testing Response statusCodes, neated up.
        //const response = function (error, result) {
        //    callback(null, {
        //        statusCode = error ? '400' : '200',
        //        body: error ? error.message : JSON.stringify(result.Items),
        //        headers: {
        //            "Content-Type" : "application/json",
        //            "Access-Control-Allow-Origin" : "*",
        //            "Access-Control-Allow-Credentials" : "true" 
        //        }
        //    });
        //};
    });
};

