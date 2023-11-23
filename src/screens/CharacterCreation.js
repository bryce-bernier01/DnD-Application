import React, {useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const CharacterCreation = () => {
    const navigation = useNavigation();

    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false,
            });
    }, [navigation]);


    return (
        <View>
            <Text>This is the character creator!</Text>
        </View>
    );
};

export default CharacterCreation;