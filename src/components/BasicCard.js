import React from 'react';
import { View, Text, StyleSheet,TouchableOpacity, onPress } from 'react-native';

const BasicCard = ({title, content, description, functionPass}) => {
    return (
        <View style={styles.card}>
            <TouchableOpacity onPress={() => functionPass(title)}>
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.content}>{content}</Text>
                <Text style={styles.content}>{description}</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 16,
        marginBottom: 16,
        elevation: 2, // For shadow on Android
        shadowColor: '#000', // For shadow on iOS
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    content: {
        fontSize: 16,
    },
})
export default BasicCard;