'use strict';

export const hello = async (event) => {
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: 'Hi Vladislav',
        input: event,
      },
      null,
      2
    ),
  };
};
