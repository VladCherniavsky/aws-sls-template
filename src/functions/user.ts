import { DynamoDB } from 'aws-sdk';

const ddb = new DynamoDB.DocumentClient();

export const addUser = async(event: any) => {
    try {
        const params = {
            Item: {
                email: 'test@gmail.com',
                name: 'Vlad'
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
