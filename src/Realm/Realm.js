import Realm from 'realm';
import TaskScheme from './TaskScheme';
import UserSchema from './UserSchema';

const realm = new Realm({
  path: 'myrealm',
  schema: [TaskScheme, UserSchema],
});

export default realm;
