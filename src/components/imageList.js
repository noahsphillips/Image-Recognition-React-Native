import React, { Component } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import {ListItem} from 'react-native-elements'
import RecognizedImage from './recognizedImage'

class ImageList extends Component {

  render() {
    return (
      <View>
        <View style={styles.container}>
          <FlatList
            data={this.props.data}
            keyExtractor={(item, index) => index}
            renderItem={({ item }) => <ListItem 
            roundAvatar 
            avatar={{uri:item.url}} 
            title={item.all_labels.Name}
            subtitle={`Confidence: ${item.all_labels.Confidence}`}
            hideChevron
          />}
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