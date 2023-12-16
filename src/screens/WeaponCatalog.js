import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Image } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import ScreenButton from '../components/ScreenButton';
import weapons from '../json/weapons.json'

const WeaponCatalog = () => {
    const navigation = useNavigation();

    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false, // Hide the header for this screen
            });
    }, [navigation]);
    const renderButton = [];

    for(let i = 0; i < weapons.length; i++){
        renderButton.push(
            <ScreenButton 
                key={i}
                title={weapons[i].buttonName}
            />
        );
    }
    return (
        <View style={styles.container}>
            {renderButton}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingTop: '8%',
        backgroundColor: '#DBCBE8',
        height: '100%',
        flex: 1,
    }
});

export default WeaponCatalog;