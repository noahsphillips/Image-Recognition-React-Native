import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

class Image extends Component {

  render() {
    return (
        <TouchableOpacity>
      <View>
        <Text style={styles.item}>{this.props.name}</Text>
      </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
    item: {
      padding: 10,
      fontSize: 18,
      height: 44,
    },
  })

export default Image;