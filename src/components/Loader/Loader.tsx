import React from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';

const Loader: React.FC = () => {
  return (
    <View style={styles.parentView}>
      <ActivityIndicator size="large" />
    </View>
  );
};

const styles = StyleSheet.create({
  parentView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export {Loader as default};
