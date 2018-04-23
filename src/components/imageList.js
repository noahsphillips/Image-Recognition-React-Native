import React, { Component } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import Image from './image'

class ImageList extends Component {

  render() {
    return (
      <View>
        <View style={styles.container}>
        <FlatList
          data={[
            {key: 'Devin'},
            {key: 'Jackson'},
            {key: 'James'},
            {key: 'Joel'},
            {key: 'John'},
            {key: 'Jillian'},
            {key: 'Jimmy'},
            {key: 'Julie'},
          ]}
          renderItem={({item}) => <Image name={item.key} />}
        />
      </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
    container: {
     height: '100%'
    }
  })

export default ImageList;