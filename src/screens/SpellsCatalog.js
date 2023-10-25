import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Image } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import ScreenButton from '../components/ScreenButton';
import spells from '../json/spells.json'

const SpellsCatalog = () => {
    const navigation = useNavigation();

    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false,
            });
    }, [navigation]);
    const renderButton = [];

    for(let i = 0; i < spells.length; i++){
        renderButton.push(
            <ScreenButton 
                index={i}
                buttonName={spells[i].buttonName}
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
})

export default SpellsCatalog;