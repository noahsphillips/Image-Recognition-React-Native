// Index.ios.js - place code in here for IOS!!!!

// Import a library to help create a component
import React, {Component} from 'react';
import { AppRegistry, View, Button } from 'react-native';
import ImageList from './src/components/imageList';
import NewImage from './src/components/newImage';
import { StackNavigator } from "react-navigation";
import { YellowBox } from 'react-native';
YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);

class Main extends Component {

  componentWillMount() {
    this.props.navigation.setParams({ goToNewImage: this._goToNewImage });
  }

  _goToNewImage = () => {
    this.props.navigation.navigate('NewImage');
  };

  static navigationOptions = ({navigation}) => {
    const params = navigation.state.params || {};

    return {
      title: 'Upload an Image',
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
        <ImageList />
    </View>
    );
  }
}

// Create a component
const App = StackNavigator({
  Main: {screen: Main},
  NewImage: {screen: NewImage}
});