import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import MapView from 'react-native-maps';
import PropTypes from 'prop-types';

const styles = StyleSheet.create({
  content: {
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#000',
    margin: 5,

  },
  container: {
    ...StyleSheet.absoluteFillObject,
    height: 400,
    width: 400,
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginTop: 100,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  title: {
    fontSize: 18,
    fontFamily: 'bold',
  },
  city: {
    fontSize: 15,
  },
});

const Map = ({ route }) => {
  const data = route.params != null ? route.params.data : {
    country: 'Pakistan', city: 'Lahore', lat: '31.5204', long: '74.3587',
  };

  return (
    <View style={styles.content}>
      <Text style={styles.title}>
        {data.country}
      </Text>
      <Text style={styles.city}>
        {data.city}
      </Text>
      <View style={styles.container}>
        <MapView
          style={styles.map}
          initialRegion={
            {
              latitude: parseInt(data.lat, 10),
              longitude: parseInt(data.long, 10),
              latitudeDelta: 0.05,
              longitudeDelta: 0.05,
            }
          }
        />
      </View>
    </View>
  );
};

Map.propTypes = {
  route: PropTypes.shape({}).isRequired,
};
Map.defaultProps = {

};
export default Map;
