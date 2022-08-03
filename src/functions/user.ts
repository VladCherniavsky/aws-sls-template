import { DynamoDB, SNS } from 'aws-sdk';
import { SNSEvent, DynamoDBStreamEvent } from 'aws-lambda';

const ddb = new DynamoDB.DocumentClient();
const sns = new SNS();

export const addUser = async(event: any) => {
    try {
        const params = {
            Item: {
                email: event.body.email,
                name: event.body.name
            },
            TableName: process.env.TABLE_NAME!
        }
        const res = await ddb.put(params).promise()

        return {
            statusCode: 200,
            message: 'hello',
            body: {
                message: 'Hi Vladislav',
                input: event,
                res
            },
        }
    } catch(error) {
        return {
            error: error
        }
    }

}

export const handleUserTableUpdate = async (event: DynamoDBStreamEvent) => {
    try {
        console.log('event', event)
        console.log('process.env.USER_TOPIC_ARN', process.env.USER_TOPIC_ARN)
        console.log('process.env', process.env)
        const record = event.Records[0]

        console.log('record.dynamodb', record.dynamodb)
        const params = {
            TopicArn: process.env.USER_TOPIC_ARN,
            Message: JSON.stringify({
                message: 'user added',
                data: record.dynamodb
            })
        }
        await sns.publish(params).promise()

        return {
            event
        }
    } catch(error) {
        console.log('error', error)
        return {
            error: error
        }
    }
}

export const handleSnsUserTopicEvent = async (event: SNSEvent) => {
    try {
        console.log('handleSnsUserTopicEvent event', event)
        console.log('handleSnsUserTopicEvent event', event.Records[0].Sns)
        return {
            event
        }
    } catch(error) {
        return {
            error: error
        }
    }
}
