import Realm from 'realm';

const UserSchema = {
  name: 'User',
  properties: {
    id: 'string',
    userName: 'string',
    password: 'string?',
  },
  primaryKey: 'id',
};

export const addUser = async (userName, password) => {
  await Realm.open({
    path: 'myrealm',
    schema: [UserSchema],
  }).then((realm) => {
    realm.write(() => {
      realm.create('User', {
        id: 2,
        userName,
        password,
      });
    });
  });
};

export const getUser = async () => {
  await Realm.open({
    path: 'myrealm',
    schema: [UserSchema],
  }).then((realm) => {
    const tasks = realm.objects('User');

    console.log(`The lists of tasks are: ${tasks.map((task) => task.userName)}`);
  });
};

export default UserSchema;
