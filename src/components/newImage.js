import React from 'react';
import {
    ActivityIndicator,
    Button,
    Clipboard,
    Image,
    Share,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import axios from 'axios';
import Exponent, { Constants, ImagePicker, registerRootComponent } from 'expo';

const request = axios.create({
    baseURL: 'https://image-recognition-node.herokuapp.com/app/photos/',
    timeout: 10000,
    headers: {            
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
});

const request2 = axios.create({
    timeout: 1000,
    headers: {            
        'Accept': 'application/json'
    }
});

export default class NewImage extends React.Component {
    state = {
        image: null,
        uploading: false,
        label: null
    };

    static navigationOptions = ({navigation}) => {
        const params = navigation.state.params || {};
    
        return {
          title: 'Recognize'
        }
      };

    render() {
        let { image } = this.state;

        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Button
                    onPress={this._pickImage}
                    title="Pick an image from camera roll"
                />

                <Button onPress={this._takePhoto} title="Take a photo" />

                {this._maybeRenderImage()}
                {this._maybeRenderLabel()}
                {this._maybeRenderUploadingOverlay()}

                <StatusBar barStyle="default" />
            </View>
        );
    }

    _maybeRenderUploadingOverlay = () => {
        if (this.state.uploading) {
            return (
                <View
                    style={[
                        StyleSheet.absoluteFill,
                        {
                            backgroundColor: 'rgba(0,0,0,0.4)',
                            alignItems: 'center',
                            justifyContent: 'center',
                        },
                    ]}>
                    <ActivityIndicator color="#fff" animating size="large" />
                </View>
            );
        }
    };

    _maybeRenderLabel = () => {
        if (this.state.label) {
            if (this.state.label.Name && this.state.label.Confidence) {
                return (
                    <View>
                        <Text>My Guess: {this.state.label.Name}</Text>
                        <Text>Confidence: {this.state.label.Confidence}</Text>
                    </View>
                )
            }
            else {
                <View>
                    <Text>Unrecognizable</Text>
                </View>
            }
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

    _takePhoto = async () => {
        let pickerResult = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            mediaTypes: 'Images',
            quality: 0,
            base64: true
        });

        this._handleImagePicked(pickerResult);
    };

    _pickImage = async () => {
        let pickerResult = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            mediaTypes: 'Images',
            quality: 0,
            base64: true
        });

        this._handleImagePicked(pickerResult);
    };

    _handleImagePicked = async pickerResult => {
        let uploadResponse, uploadResult;

        try {
            this.setState({ uploading: true });

            if (!pickerResult.cancelled) {
                console.log(pickerResult)
                uploadResponse = await uploadImageAsync(pickerResult.uri, pickerResult.base64);
                if (!uploadResponse) {
                    throw 500;
                }
                this.setState({ image: uploadResponse.url });

                console.log(uploadResponse)
            }

            var labels = await recognizeImage(uploadResponse.fileName, uploadResponse.url)

            this.setState({label: labels})

            this.props.navigation.state.params.refresh()

        } catch (e) {
            console.log({ uploadResponse });
            console.log({ uploadResult });
            console.log({ e });
            alert('Upload failed, sorry :(');
        } finally {
            this.setState({ uploading: false });
        }
    };
}

async function uploadImageAsync(uri, base64) {
    return new Promise(async (res, rej) => {

        let uriParts = uri.split('.');
        let fileType = uriParts[uriParts.length - 1];
    
        var response = await request.post('/sign', {
            fileName: `photo.${fileType}`,
            fileType: `image/${fileType}`,
            base64: `data:image/jpeg;base64,${base64}`
        })

        return res(response.data)
    })
}

async function recognizeImage(fileName, url) {
    return new Promise(async (res, rej) => {
        console.log(fileName)
        console.log(url)
        var response = await request.post('/recognize', {
            fileName,
            url
        })

        console.log('***',response)

        return res(response.data.upload.all_labels)

    })
}