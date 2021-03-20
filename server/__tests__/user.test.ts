import { callSchema } from '../test-utils/callSchema';
import { UserEntity } from '../typeorm/entity/UserEntity';
import faker from 'faker';

test('Test Fetch All User Graphql', async () => {
  const query = `
    query {
        getAll {
          status
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
        status: '200',
      },
    },
  });
});

test('Test Get Detail User', async () => {
  const query = `
        query getDetail($options: String!) {
            getDetail(options: $options) {
                status
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
        status: '200',
      },
    },
  });
});

test('Test Record New User', async () => {
  const mutation = `
        mutation createNewuser($options: CreateNewUserInput!) {
            createNewuser(options: $options) {
                status
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
        status: '201',
        message: 'Accounts has been created',
      },
    },
  });
});

test('Test Reset User', async () => {
  const mutation = `
        mutation resetUser($options: resetUserInput!) {
            resetUser(options: $options) {
                status
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
        status: '200',
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
        status
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
        status: '200',
      },
    },
  });
});
