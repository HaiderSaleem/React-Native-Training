import React from 'react';
import { TextInput, View, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import PropTypes from 'prop-types';

const styles = StyleSheet.create({
  body: {
    flexDirection: 'row',
    width: '88%',
    alignItems: 'center',
    backgroundColor: 'white',
    height: 50,
    margin: 10,
    borderRadius: 5,
    elevation: 4,
  },
  search:
    {
      backgroundColor: 'white',
      margin: 15,
      width: '85%',
      height: 50,
      fontSize: 16,
    },

});
const CustomSearchBar = ({ updatingText }) => (
  <View style={styles.body}>
    <Icon name="search" size={15} color="black" style={{ paddingStart: 10 }} />
    <TextInput
      placeholder="Country, City, or Place"
      keyboardType="twitter"
      style={styles.search}
      onChangeText={(value) => updatingText(value)}
    />
  </View>
);

CustomSearchBar.prototype = ({
  updatingText: PropTypes.func.isRequired,
});
CustomSearchBar.defaultProps = {
};
export default CustomSearchBar;
