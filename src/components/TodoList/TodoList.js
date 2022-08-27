import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/FontAwesome5';

const styles = StyleSheet.create({
  item: {
    padding: 15,
    marginTop: 20,
    marginHorizontal: 20,
    borderColor: '#bbb',
    borderStyle: 'dashed',
    borderRadius: 10,
    borderWidth: 1,
    flexDirection: 'row',
    alignContent: 'center',
  },
  text: {
    marginStart: 10,
    textAlign: 'center',
    alignContent: 'center',
  },
});

export default function TodoList({ onItemPresses, item }) {
  return (
    <TouchableOpacity onPress={() => onItemPresses(item.id)}>
      <View style={styles.item}>
        <Icon name="trash" size={20} />
        <Text style={styles.text}>{item.name}</Text>
      </View>
    </TouchableOpacity>
  );
}

TodoList.propTypes = {
  onItemPresses: PropTypes.func.isRequired,
  item: PropTypes.instanceOf(Object).isRequired,
};
TodoList.defaultProps = {

};
