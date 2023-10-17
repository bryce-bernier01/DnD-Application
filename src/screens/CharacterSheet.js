import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Image } from 'react-native'

const CharacterSheet = () => {
    return (
        <View style={styles.container}>
            <Text>
                This will be the Character Sheet!
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: '100%',
    }
})

export default CharacterSheet;