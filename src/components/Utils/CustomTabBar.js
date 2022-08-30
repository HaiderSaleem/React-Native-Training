/* eslint-disable no-nested-ternary */
import React from 'react';
import {
  View, Text, TouchableOpacity, StyleSheet,
} from 'react-native';
import { FAB } from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';

const styles = StyleSheet.create({
  tab1: {
    flex: 1,
    borderTopLeftRadius: 25,
  },
  tab2: {
    flex: 1,
  },
  tab3: {
    flex: 1,
    borderTopRightRadius: 25,
  },
});

function CustomTabBar({ state, descriptors, navigation }) {
  const focusedOptions = descriptors[state.routes[state.index].key].options;

  if (focusedOptions.tabBarVisible === false) {
    return null;
  }
  const FocusedGradient = ['#4c669f', '#3b5998', '#192f6a'];
  const NotFocusedGradient = ['#ffffff', '#ffffff'];

  return (
    <View style={{
      flexDirection: 'row', backgroundColor: '#fff', height: 50, borderRadius: 100, justifyContent: 'center', alignItems: 'center',
    }}
    >
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label = options.tabBarLabel !== undefined
          ? options.tabBarLabel
          : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        function getStyle() {
          if (index === 0) return styles.tab1;
          if (index === 1) return styles.tab2;
          return styles.tab3;
        }

        function getTextColor() {
          return isFocused ? 'white' : '#4c669f';
        }
        return (
          index !== 1
            ? (
              <LinearGradient
                colors={isFocused ? FocusedGradient : NotFocusedGradient}
                style={getStyle()}
              >
                <TouchableOpacity
                  accessibilityRole="button"
                  accessibilityState={isFocused ? { selected: true } : {}}
                  accessibilityLabel={options.tabBarAccessibilityLabel}
                  onPress={onPress}
                  onLongPress={onLongPress}
                  style={{
                    minHeight: 50,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <Text style={{ color: isFocused ? 'white' : '#222' }}>
                    {label}
                  </Text>
                </TouchableOpacity>
              </LinearGradient>
            )
            : (
              <View style={{
                position: 'absolute', alignSelf: 'center', backgroundColor: '#f8f4f4', width: 70, height: 70, borderRadius: 35, bottom: 25, zIndex: 10,
              }}
              >

                <FAB
                  color={isFocused ? '#4c669f' : '#fff'}
                  style={{
                    minHeight: 50,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                  icon={{ name: 'add', color: getTextColor() }}
                  onPress={onPress}
                  onLongPress={onLongPress}
                  visible
                />
              </View>

            )
        );
      })}
    </View>
  );
}

export default CustomTabBar;
