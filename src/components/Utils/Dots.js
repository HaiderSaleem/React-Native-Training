import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';

const Dots = ({ keyIndex, currentIndex }) => (
  <View
    style={{
      width: 15,
      height: 15,
      marginHorizontal: 5,
      backgroundColor: keyIndex === currentIndex ? 'blue' : 'black',
      alignItems: 'center',
      borderRadius: 100,
    }}
  />
);

Dots.propTypes = {
  keyIndex: PropTypes.number.isRequired,
  currentIndex: PropTypes.number.isRequired,
};

export default Dots;
