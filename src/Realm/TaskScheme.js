import Realm from 'realm';

const TaskScheme = {
  name: 'Tasks',
  properties: {
    id: 'string',
    task: 'string',
  },
  primaryKey: 'id',
};

export default TaskScheme;
