
import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Image, TextInput, TouchableOpacity } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import MapViewDirections from 'react-native-maps-directions';
const GOOGLE_MAPS_APIKEY = 'AIzaSyCTj77B8GpV0Wzt7KCqJGb2ZRA5V6uHB1Q';
import Geolocation from '@react-native-community/geolocation';
Geolocation.getCurrentPosition(info => console.log(info));
export default function App(props) {
    const [origin, setOrigin] = useState(null);
    const [destination, setDestination] = useState(null);
    const [directions, setDirections] = useState(null);
    const [currentLocation, setCurrentLocation] = useState(null);
    const handleDirection = () => {
        if (origin && destination) {
            setDirections({
                origin: origin.description,
                destination: destination.description,
            });
        }
    };
    const [position, setPosition] = useState({
        latitude: 10.853864,
        longitude: 106.627351,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
    });
    const [position2, setPosition2] = useState({
        latitude: 10.8529642,
        longitude: 106.6282855,
        latitudeDelta: 0.1,
        longitudeDelta: 0.01,
    });
    const [position3, setPosition3] = useState({
        latitude: 10.8529096,
        longitude: 106.6291175,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
    });
    // add this to the component's useEffect hook
    useEffect(() => {
        Geolocation.getCurrentPosition(
            position => {
                setCurrentLocation({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                    latitudeDelta: 0.01,
                    longitudeDelta: 0.01,
                });
            },
            error => console.log(error),
            { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
        );
    }, []);
    return (
        <View style={styles.container}>
            <MapView
                style={styles.map}
                initialRegion={position}
                showsUserLocation={true}
                showsMyLocationButton={true}
                followsUserLocation={true}
                showsCompass={true}
                scrollEnabled={true}
                zoomEnabled={true}
                pitchEnabled={true}
                apiKey={GOOGLE_MAPS_APIKEY}
                rotateEnabled={true}>
                <Marker
                    title='Yor are here'
                    description='This is a description'
                    coordinate={position} />
                <Marker
                    title='Yor are here'
                    description='This is a description'
                    coordinate={position2} />
                <Marker
                    title='Yor are here'
                    description='This is a description'
                    coordinate={position3} />

            </MapView>

            {/* <View style={styles.search}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Image style={{width:20,height:20}} source={require('../../assets/img/IconArrow.png')} />
                </TouchableOpacity>
            </View> */}
        </View>

    );

}
const styles = StyleSheet.create({
    container: {
        width:300,
        height:300,
        justifyContent: 'center',
        alignItems: 'center',
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
    search: {
        position: 'absolute',
        top: 50,
        left: 10,
        right: 10,
        flexDirection: 'row',
    },

});
