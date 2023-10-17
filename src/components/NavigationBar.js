import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Image } from 'react-native'

const NavigationBar = () => {
    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.tab}>
                <Image 
                    style={[styles.icons, styles.scroll]}
                    source={require('../navbarIcons/Scroll.png')}
                />
            </TouchableOpacity>
            <TouchableOpacity style={styles.tab}>
                <Image 
                    style={styles.icons}
                    source={require('../navbarIcons/SpellCatalog.png')}
                />
            </TouchableOpacity>
            <TouchableOpacity style={styles.tab}>
                <Image 
                    style={styles.icons}
                    source={require('../navbarIcons/MonsterCatalog.png')}
                />
            </TouchableOpacity>
            <TouchableOpacity style={styles.tab}>
                <Image 
                    style={styles.icons}
                    source={require('../navbarIcons/WeaponCatalog.png')}
                />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row', // Horizontal layout
        justifyContent: 'space-between', // Equal spacing between tabs
        alignItems: 'center', // Center items vertically
        backgroundColor: '#AA8CCD', // Background color for the navigation bar
        height: 60, // Set the desired height of the navigation bar
    },
    tab:{
        flex: 1,
        alignItems: 'center',
        paddingTop: 5,
        paddingBottom: 5,
    },
    tabText:{
        fontSize: 16,
        fontWeight: 'bold'
    },
    icons: {
        width: 50,
        height: 50,
    },
    scroll: {
        width: 65
    }
});

export default NavigationBar;