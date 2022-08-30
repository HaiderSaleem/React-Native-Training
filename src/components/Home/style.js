import { StyleSheet }
  from 'react-native';

// eslint-disable-next-line import/prefer-default-export
export const getStyle = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  body: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    padding: 20,
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    marginTop: 10,
    marginBottom: 10,
  },
  input: {
    borderWidth: 2,
    borderColor: '#777',
    margin: 10,
    padding: 20,
  },
  list: {
    flex: 1,
  },
});
