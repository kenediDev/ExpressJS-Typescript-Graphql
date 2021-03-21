import { callSchema } from '../test-utils/callSchema';
import { UserEntity } from '../typeorm/entity/UserEntity';
import faker from 'faker';

test('Test Fetch All User Graphql', async () => {
  const query = `
    query {
        getAll {
          statusCode
        }
      }
    `;
  const res = await callSchema({
    source: query,
  });
  expect(res).not.toEqual(null);
  expect(res).toEqual({
    data: {
      getAll: {
        statusCode: 200,
      },
    },
  });
});

test('Test Get Detail User', async () => {
  const query = `
        query getDetail($options: String!) {
            getDetail(options: $options) {
                statusCode
            }
        }
    `;
  const user = await UserEntity.findOne();
  const res = await callSchema({
    source: query,
    variableValues: {
      options: user.id,
    },
  });
  expect(res).not.toEqual(null);
  expect(res).toEqual({
    data: {
      getDetail: {
        statusCode: 200,
      },
    },
  });
});

test('Test Record New User', async () => {
  const mutation = `
        mutation createNewuser($options: CreateNewUserInput!) {
            createNewuser(options: $options) {
                statusCode
                message
            }
        }
    `;
  const res = await callSchema({
    source: mutation,
    variableValues: {
      options: {
        username: faker.internet.userName(),
        email: faker.internet.email(),
        password: 'Password',
        confirm_password: 'Password',
      },
    },
  });
  expect(res).not.toEqual(null);
  expect(res).toEqual({
    data: {
      createNewuser: {
        statusCode: 201,
        message: 'Accounts has been created',
      },
    },
  });
});

test('Test Reset User', async () => {
  const mutation = `
        mutation resetUser($options: resetUserInput!) {
            resetUser(options: $options) {
                statusCode
                message
            }
        }
    `;
  const filter = await UserEntity.findOne();
  const res = await callSchema({
    source: mutation,
    variableValues: {
      options: {
        token: filter.username,
      },
    },
  });
  expect(res).not.toEqual(null);
  expect(res).toEqual({
    data: {
      resetUser: {
        statusCode: 200,
        message:
          'Check your email for a link to reset your password. If it doesn’t appear within a few minutes, check your spam folder.',
      },
    },
  });
});

test('Test User Login', async () => {
  const mutation = `
    mutation login($options: loginUserInput!) {
      login(options: $options) {
        statusCode
      }
    }
  `;
  const user = await UserEntity.findOne();
  const res = await callSchema({
    source: mutation,
    variableValues: {
      options: {
        token: user.username,
        password: 'Password',
      },
    },
  });
  expect(res).not.toEqual(null);
  expect(res).toEqual({
    data: {
      login: {
        statusCode: 200,
      },
    },
  });
});
