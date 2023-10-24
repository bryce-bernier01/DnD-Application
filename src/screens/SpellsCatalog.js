import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Image } from 'react-native'
import { useNavigation } from '@react-navigation/native';

const SpellsCatalog = () => {
    const navigation = useNavigation();

    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false, // Hide the header for this screen
            });
    }, [navigation]);
    return (
        <View style={styles.container}>
            <Text>
                This will be the Spells Catalog!
            </Text>
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