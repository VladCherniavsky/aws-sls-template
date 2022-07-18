

export const addUser = async(event: any) => {
    return {
        statusCode: 200,
        message: 'hello',
        body: {
            message: 'Hi Vladislav',
            input: event,
            env: process.env
        },
    }
}
