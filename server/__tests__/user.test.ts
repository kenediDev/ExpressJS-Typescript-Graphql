import faker from 'faker';
import { UserEntity } from '../typeorm/entity/UserEntity';
import { active, callSchema } from '../utils-test/setup';
import fs from 'fs';
import path from 'path';

describe('User', () => {
  test('Check', async (done) => {
    const check = await UserEntity.createQueryBuilder().getCount();
    fs.writeFileSync(
      path.join(__dirname, '../utils-test/requirementsTest.txt'),
      `${check}`
    );
    return done();
  });
  test('Record User', async (done) => {
    const mutation = `
          mutation createUser($options: CreateNewUserInput!) {
              createUser(options: $options) {
                  message
                  status
                  statusCode
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
    expect(res.data).toEqual({
      createUser: {
        message: 'Accounts has been created',
        status: 'Success',
        statusCode: 201,
      },
    });
    return done();
  });

  if (active) {
    test('Update User', async (done) => {
      const user = await UserEntity.findOne();
      const mutation = `
        mutation updateUser($options: UpdateUserInput!) {
          updateUser(options: $options) {
            message
            status
            statusCode
          }
        }
      `;
      const res = await callSchema({
        source: mutation,
        variableValues: {
          options: {
            id: user.id,
            first_name: faker.name.firstName(),
            last_name: faker.name.lastName(),
          },
        },
      });
      expect(res.data).toEqual({
        updateUser: {
          message: 'Profile has been updated',
          status: 'Success',
          statusCode: 200,
        },
      });
      return done();
    });
  } else {
    test.skip('User not have data', async (done) => {
      expect(1 + 1).toBe(2);
      return done();
    });
  }
});
