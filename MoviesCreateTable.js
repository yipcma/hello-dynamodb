var AWS = require("aws-sdk")

AWS
  .config
  .update({region: "us-west-2", endpoint: "http://localhost:8000"})

var dynamodb = new AWS.DynamoDB()

var params = {
  TableName: "Movies",
  KeySchema: [
    {
      AttributeName: "year",
      KeyType: "HASH"
    }, {
      AttributeName: "title",
      KeyType: "RANGE"
    }
  ],
  AttributeDefinitions: [
    {
      AttributeName: "year",
      AttributeType: "N"
    }, {
      AttributeName: "title",
      AttributeType: "S"
    }
  ],
  ProvisionedThroughput: {
    ReadCapacityUnits: 1,
    WriteCapacityUnits: 1
  }
}

dynamodb.createTable(params, function (err, data) {
  if (err) {
    console.error("Unable to create table. Error JSON:", JSON.stringify(err))
  } else {
    console.log("Created table. Table description JSON:", JSON.stringify(data))
  }
})
