import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

class Image extends Component {

  render() {
    return (
      <TouchableOpacity>
        <View>
          <View
            style={{
              borderTopRightRadius: 3,
              borderTopLeftRadius: 3,
              overflow: 'hidden',
            }}>
            <Image source={this.props.url} style={{ width: 25, height: 25 }} />
          </View>
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