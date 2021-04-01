import { gql } from 'graphql-request';
import faker from 'faker';
import { UserEntity } from '../typeorm/entity/UserEntity';
import { callSchema, active, token } from '../utils-test/setup';
import fs from 'fs';
import path from 'path';
import jsonwebtoken from 'jsonwebtoken';

describe('User', () => {
  test('Check', async (done) => {
    const check = await UserEntity.createQueryBuilder().getCount();
    const read = fs.readFileSync(
      path.join(__dirname, '../utils-test/requirementsTest.json'),
      { encoding: 'utf-8' }
    );
    fs.writeFileSync(
      path.join(__dirname, '../utils-test/requirementsTest.json'),
      `${JSON.stringify(
        JSON.parse(read).map((x) => {
          return {
            count: check,
            token: x.token,
          };
        })
      )}`
    );
    return done();
  });
  test('Record User', async (done) => {
    const mutation = gql`
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
    expect(res.data.createUser.statusCode).toEqual(201);
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
    test('Login User', async (done) => {
      const user = await UserEntity.findOneOrFail();
      const mutation = gql`
        mutation loginUser($options: LoginUserInput!) {
          loginUser(options: $options) {
            status
            statusCode
            token
          }
        }
      `;
      const res = await callSchema({
        source: mutation,
        variableValues: {
          options: {
            username: user.username,
            password: 'Password',
          },
        },
      });
      const read = fs.readFileSync(
        path.join(__dirname, '../utils-test/requirementsTest.json'),
        { encoding: 'utf-8' }
      );
      fs.writeFileSync(
        path.join(__dirname, '../utils-test/requirementsTest.json'),
        `${JSON.stringify(
          JSON.parse(read).map((x) => {
            return {
              count: x.count,
              token: res.data.loginUser.token,
            };
          })
        )}`
      );
      // expect(res.data.loginUser.statusCode).toEqual(200);
      expect(res.data).toEqual({
        loginUser: {
          status: 'Success',
          statusCode: 200,
          token: res.data.loginUser.token,
        },
      });
      return done();
    });
    test('Update User', async (done) => {
      const user = await UserEntity.findOne();
      const mutation = gql`
        mutation updateUser($options: UpdateUserInput!) {
          updateUser(options: $options) {
            message
            status
            statusCode
          }
        }
      `;
      let req: Request;
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
      // expect(res.data.updateUser.statusCode).toEqual(200);
      expect(res.data).toEqual({
        updateUser: {
          message: 'Profile has been updated',
          status: 'Success',
          statusCode: 200,
        },
      });
      return done();
    });

    test('Get All User', async (done) => {
      const query = gql`
        query {
          getAllUser {
            status
            statusCode
            results {
              id
              username
              email
              updateAt
              accounts {
                id
                avatar
                first_name
                last_name
                avatar
                location {
                  id
                  country
                  province
                  city
                  address
                }
              }
            }
          }
        }
      `;
      const res = await callSchema({
        source: query,
        variableValues: {
          options: {
            query: {
              token: `Bearer ${token}`,
            },
          },
        },
        contextValue: {
          user: (await jsonwebtoken.decode(token)) as any,
        },
      });
      expect(res.data.getAllUser.statusCode).toEqual(200);
      expect(res.data).toEqual({
        getAllUser: {
          status: 'Success',
          statusCode: 200,
          results: res.data.getAllUser.results,
        },
      });
      return done();
    });
    test('Detail User', async (done) => {
      const detail = await UserEntity.findOne();
      const query = gql`
        query getDetail($options: String!) {
          getDetail(options: $options) {
            status
            statusCode
            user {
              id
              username
              email
              updateAt
              accounts {
                id
                avatar
                first_name
                last_name
                avatar
                location {
                  id
                  country
                  province
                  city
                  address
                }
              }
            }
          }
        }
      `;
      const res = await callSchema({
        source: query,
        variableValues: {
          options: detail.id,
        },
        contextValue: {
          user: (await jsonwebtoken.decode(token)) as any,
        },
      });
      expect(res.data.getDetail.statusCode).toEqual(200);
      expect(res.data).toEqual({
        getDetail: {
          status: 'Success',
          statusCode: 200,
          user: res.data.getDetail.user,
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
