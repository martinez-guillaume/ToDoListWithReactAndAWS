const AWS = require('aws-sdk');

AWS.config.update({
  region: 'us-east-1',
  endpoint: 'http://localhost:4566' // LocalStack endpoint
});

const docClient = new AWS.DynamoDB.DocumentClient();

module.exports = docClient;

