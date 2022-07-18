

export const addUser = () => {
    return {
        statusCode: 200,
        message: 'hello',
        body: JSON.stringify(
            {
                message: 'Hi Vladislav',
                input: event,
            },
            null,
            2
        ),
    }
}
