import React, {useState, useEffect} from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Modal, Image, ScrollView } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import ScreenButton from '../components/ScreenButton';
import spells from '../json/spells.json';
import BasicCard from '../components/BasicCard';
import * as SQLite from 'expo-sqlite';

const SpellsCatalog = () => {
    const [spellData, setSpellData] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [spellModalVisible, setSpellModalVisible] = useState(false);
    const [spellString, setSpellString] = useState("");
    useEffect(()=> {
        const db = SQLite.openDatabase('dndDatabase.db');
        const getSpells = () => {
                db.transaction(tx => {
                    tx.executeSql(
                        'SELECT SpellName, Level, Class, Range FROM "spells"',
                        [],
                        (sqlTx, res) => {
                        console.log("spells retrieved successfully");
                        let len = res.rows.length;
                        if(len > 0){
                            let results = [];
                            for(let i = 0; i < len; i++){
                                let item = res.rows.item(i);
                                results.push({SpellName: item.SpellName, Level: item.Level, Class: item.Class, Range: item.Range})
                            }
                            setSpellData(results);
                        }
                        },
                        error=>{console.log('error on getting categories ' + error.message)}
                )
            })
        };
        getSpells();
    }, []);
    const showSpellModal = () => {
        setSpellModalVisible(true);
        setModalVisible(true);
    };
    const hideSpellModal = () => {
        setSpellModalVisible(false);
        setModalVisible(false);
    };
    
    
    const renderSpells = [];
    for(let i = 0; i < spellData.length; i++){
        renderSpells.push(
            <BasicCard 
                key={i}
                title={spellData[i].SpellName}
                content={spellData[i].Class}
                description={"Level: " + spellData[i].Level + " Range: " + spellData[i].Range}
            />
        );
    }

    const navigation = useNavigation();

    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false,
            });
    }, [navigation]);
    const renderButton = [];

    // for(let i = 0; i < 1; i++){
    //     renderButton.push(
    //         <ScreenButton
    //             key={i}
    //             index={i}
    //             buttonName="Spells"
    //             onPress={showSpellModal}
    //         />
    //     );
    // }
    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={showSpellModal} style={styles.modalCloseButton}>
                <Text style={styles.modalCloseText}>Spells!</Text>
            </TouchableOpacity>
            {modalVisible && <View style={styles.overlay}></View>}
            <Modal
                    animationType="slide"
                    transparent={true}
                    visible={spellModalVisible}
                    onRequestClose={hideSpellModal}
                >
                    <View style={styles.modalContainer}>
                        <View style={styles.modalContent}>
                            <ScrollView style={styles.modalScrollContainer}>
                                {renderSpells}
                            </ScrollView>
                            <TouchableOpacity style={styles.modalCloseButton} onPress={hideSpellModal}>
                                <Text style={styles.modalCloseText}>Close</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
            </Modal>
        </View>
        
    );
};

const styles = StyleSheet.create({
    container: {
        paddingTop: '8%',
        backgroundColor: '#DBCBE8',
        height: '100%',
        flex: 1,
    },
    categoryHeader:{
        fontSize: 20,
        fontWeight: 'bold',
    },
    categoryButton:{
        backgroundColor: 'rgba(0, 0, 0, 0.1)',
        borderRadius: 5,
        width: 95,
        height: 30,
        alignItems: 'center',
    },
    categoryButtonText:{
        fontSize: 16,
        marginTop: 'auto',
        marginBottom: 'auto',
    },
    categoryContainer:{
        alignItems: 'center',
        paddingTop: 20,
    },
    modalContainer:{
        flex: 1,
        // height: '80%',
        // width: '80%',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 'auto',
        zIndex: 99,
    },
    modalContent:{
        height: '80%',
        width: '90%',
        borderRadius: 10,
    },
    modalScrollContainer: {
        flex: 1,
    },
    modalCloseButton:{
        marginTop: 10,
        backgroundColor:'#2C1B47',
        height: 40,
        width: 90,
        borderRadius: 10,
        marginLeft: 'auto',
        marginRight: 'auto',
    },
    modalCloseText:{
        color: '#D6C6E2',
        marginTop: 'auto',
        marginBottom: 'auto',
        marginLeft: 'auto',
        marginRight: 'auto',
    },
})

export default SpellsCatalog;