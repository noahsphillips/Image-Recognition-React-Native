import React from 'react';
import {
    ActivityIndicator,
    Button,
    Image,
    StatusBar,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import axios from 'axios';
import Exponent, { Constants, registerRootComponent } from 'expo';

const request = axios.create({
    baseURL: 'https://image-recognition-node.herokuapp.com/app/photos/',
    timeout: 10000,
    headers: {            
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
});

export default class SingleImage extends React.Component {
    state = {
        image: null,
        label: null
    };

    static navigationOptions = ({navigation}) => {
        const params = navigation.state.params || {};
    
        return {
          title: 'Previously Recognized'
        }
      };

    render() {
        let { image } = this.state;

        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>

                {this._maybeRenderImage()}
                {this._maybeRenderLabel()}

                <StatusBar barStyle="default" />
            </View>
        );
    }

    _maybeRenderLabel = () => {
        if (this.state.label) {
            return (
                <View>
                    <Text>My Guess: {this.state.label.Name}</Text>
                    <Text>Confidence: {this.state.label.Confidence}</Text>
                </View>
            )
        }
    };

    _maybeRenderImage = () => {
        let { image } = this.state;
        if (!image) {
            return;
        }

        return (
            <View
                style={{
                    marginTop: 30,
                    width: 250,
                    borderRadius: 3,
                    elevation: 2,
                    shadowColor: 'rgba(0,0,0,1)',
                    shadowOpacity: 0.2,
                    shadowOffset: { width: 4, height: 4 },
                    shadowRadius: 5,
                }}>
                <View
                    style={{
                        borderTopRightRadius: 3,
                        borderTopLeftRadius: 3,
                        overflow: 'hidden',
                    }}>
                    <Image source={{ uri: image }} style={{ width: 250, height: 250 }} />
                </View>

                <Text
                    style={{ paddingVertical: 10, paddingHorizontal: 10 }}>
                </Text>
            </View>
        );
    };

    async findImage() {
        var image = await getImage( this.props.id )
        this.setState({image: image.url, label: image.all_labels.Name})
    }

    componentDidMount() {
        this.findImage()
    }
}

async function getImage(id) {
    return new Promise(async (res, rej) => {
  
        var response = await request.get(`/${id}`)
  
        console.log('***',response)
  
        return res(response.data)
  
    })
  }