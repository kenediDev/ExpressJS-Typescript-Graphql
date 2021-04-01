import faker from 'faker';
import { UserEntity } from '../typeorm/entity/UserEntity';
import { callSchema, active, token } from '../utils-test/setup';
import fs from 'fs';
import path from 'path';
import jsonwebtoken from 'jsonwebtoken';
import { T } from '../middleware/middlewareGraphql';
import {
  queryAllUser,
  queryDetailUser,
  queryMe,
} from './typeDefs/types/userTypeDefs';
import {
  mutationLoginUser,
  mutationRecordUser,
  mutationUpdateUser,
} from './typeDefs/mutation/userMutation';

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
    const res = await callSchema({
      source: mutationRecordUser,
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
    expect(res.data).not.toEqual(null);
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
      const res = await callSchema({
        source: mutationLoginUser,
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
      expect(res.data.loginUser.statusCode).toEqual(200);
      expect(res.data).not.toEqual(null);
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
      let req: Request;
      const res = await callSchema({
        source: mutationUpdateUser,
        variableValues: {
          options: {
            first_name: faker.name.firstName(),
            last_name: faker.name.lastName(),
          },
        },
        contextValue: {
          user: (await jsonwebtoken.decode(token)) as T,
        },
      });
      expect(res.data.updateUser.statusCode).toEqual(200);
      expect(res.data).not.toEqual(null);
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
      const res = await callSchema({
        source: queryAllUser,
        contextValue: {
          user: (await jsonwebtoken.decode(token)) as T,
        },
      });
      expect(res.data.getAllUser.statusCode).toEqual(200);
      expect(res.data).not.toEqual(null);
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
      const res = await callSchema({
        source: queryDetailUser,
        variableValues: {
          options: detail.id,
        },
        contextValue: {
          user: (await jsonwebtoken.decode(token)) as T,
        },
      });
      expect(res.data.getDetail.statusCode).toEqual(200);
      expect(res.data).not.toEqual(null);
      expect(res.data).toEqual({
        getDetail: {
          status: 'Success',
          statusCode: 200,
          user: res.data.getDetail.user,
        },
      });
      return done();
    });
    test('Me', async (done) => {
      const res = await callSchema({
        source: queryMe,
        contextValue: {
          user: (await jsonwebtoken.decode(token)) as T,
        },
      });
      expect(res.data.getMe.statusCode).toEqual(200);
      expect(res.data).not.toEqual(null);
      expect(res.data).toEqual({
        getMe: {
          status: 'Success',
          statusCode: 200,
          user: res.data.getMe.user,
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
