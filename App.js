// Import a library to help create a component
import React, {Component} from 'react';
import { AppRegistry, View, Button, Text } from 'react-native';
import ImageList from './src/components/imageList';
import NewImage from './src/components/newImage';
import SingleImage from './src/components/singleImage';
import { StackNavigator } from "react-navigation";
import { YellowBox } from 'react-native';
import axios from 'axios';
YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);
console.disableYellowBox = true;

const request = axios.create({
  baseURL: 'https://image-recognition-node.herokuapp.com/app/photos/',
  timeout: 10000,
  headers: {            
      'Accept': 'application/json',
      'Content-Type': 'application/json'
  }
});

class Main extends Component {

  state = {
    date: []
  }

  componentWillMount() {
    this.props.navigation.setParams({ goToNewImage: this._goToNewImage });
  }

  _goToNewImage = () => {
    this.props.navigation.navigate('NewImage', {refresh: this._generateList});
  };

  static navigationOptions = ({navigation}) => {
    const params = navigation.state.params || {};

    return {
      title: 'Previous Uploads',
      headerRight: (
        <Button
          onPress={params.goToNewImage}
          title="New"
        />
      )
    }
  };

  render() {
    return (
      <View>
        <ImageList data={this.state.data}/>
        <Text>By: Noah Phillips</Text>
      </View>
    );
  }

  _generateList = async () => {
    var response = await getImages()
    this.setState({data: response.uploads.reverse()})
  };

  componentDidMount() {
    this._generateList()
  }
}

async function getImages() {
  return new Promise(async (res, rej) => {

      var response = await request.get('/')

      console.log('***',response)

      return res(response.data)

  })
}

// Create a component
export default App = StackNavigator({
  Main: {screen: Main},
  NewImage: {screen: NewImage},
  SingleImage: {screen: SingleImage}
});