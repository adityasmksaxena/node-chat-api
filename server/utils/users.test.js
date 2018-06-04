const expect = require('expect');

const { Users } = require('./users');

describe('Users', () => {
  let users;
  
  beforeEach(() => {
    users = new Users();
    users.users = [{
      id: '1',
      name: 'Sagar',
      room: 'Fivetran',
    }, {
      id: '2',
      name: 'Ram',
      room: 'Jaipur',
    }, {
      id: '3',
      name: 'Abhay',
      room: 'Fivetran',
    }];
  });
  
  it('should add new users', () => {
    const users = new Users();
    const user = {
      id: '123',
      name: 'Aditya',
      room: 'bootcamp',
    };
    const resUser = users.addUsers(user.id, user.name, user.room);
    expect(users.users).toMatchObject([user]);
  });
  
  it('should return names for Fivetran', () => {
    const userList = users.getUserList('Fivetran');
    expect(userList).toMatchObject(['Sagar', 'Abhay']);
  });
  
  it('should return names for Jaipur', () => {
    const userList = users.getUserList('Jaipur');
    expect(userList).toMatchObject(['Ram']);
  });
  
  it('should find user', () => {
    const userId = '2';
    const user = users.getUser(userId);
    expect(user.id).toBe(userId);
  });
  
  it('should not find user', () => {
    const userId = '10';
    const user = users.getUser(userId);
    expect(user).toBeFalsy();
  });
  
  it('should remove a user', () => {
    const userId = '2';
    const user = users.removeUser(userId);
    expect(user.id).toBe(userId);
    expect(users.users.length).toBe(2);
  });
  
  it('should not remove user', () => {
    const userId = '10';
    const user = users.removeUser(userId);
    expect(user).toBeFalsy();
    expect(users.users.length).toBe(3);
  });
  
});