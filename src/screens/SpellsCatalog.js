import React, {useState, useEffect} from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Modal, Image, ScrollView } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import ScreenButton from '../components/ScreenButton';
import spells from '../json/spells.json';
import BasicCard from '../components/BasicCard';
import * as SQLite from 'expo-sqlite';

const SpellsCatalog = () => {
    const [spellData, setSpellData] = useState([]);
    const [filteredSpellData, setFilteredSpellData] = useState([])
    const [modalVisible, setModalVisible] = useState(false);
    const [spellModalVisible, setSpellModalVisible] = useState(false);
    const [spellString, setSpellString] = useState("");
    const [classCount, setClassCount] = useState(0);
    const [classList, setClassList] = useState([]);
    const [renderSpells, setRenderSpells] = useState([]);
    const [isLoading, setIsLoading] = useState([false]);

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
        const getClassNames = () => {
            db.transaction(tx => {
                tx.executeSql(
                    'SELECT DISTINCT Class FROM spells',
                    [],
                    (sqlTx, res) => {
                    console.log("spells retrieved successfully");
                    let len = res.rows.length;
                    if(len > 0){
                        let results = [];
                        for(let i = 0; i < len; i++){
                            let item = res.rows.item(i);
                            console.log(item.Class);
                            results.push(item.Class);
                        }
                        setClassList(results);
                    }
                    },
                    error=>{console.log('error on getting categories ' + error.message)}
                )
            })
        };
        getSpells();
        getClassNames();
        console.log("Class count: " + classList.length);
    }, []);
    
    const getFilteredSpells = (className) => {
        const db = SQLite.openDatabase('dndDatabase.db');
            db.transaction(tx => {
                tx.executeSql(
                    'SELECT SpellName, Level, Class, Range FROM "spells" WHERE Class = ?',
                    [className],
                    (sqlTx, res) => {
                    console.log("spells retrieved successfully");
                    let len = res.rows.length;
                    if(len > 0){
                        let results = [];
                        for(let i = 0; i < len; i++){
                            let item = res.rows.item(i);
                            results.push({SpellName: item.SpellName, Level: item.Level, Class: item.Class, Range: item.Range})
                        }
                        setFilteredSpellData(results);
                    }
                    },
                    error=>{console.log('error on getting categories ' + error.message)}
            )
        })
    }
    
    // const countClasses = () => {
    //     db.transaction(tx => {
    //                 tx.executeSql(
    //                     'SELECT COUNT(DISTINCT Class) AS NumberOfClasses FROM spells',
    //                     [],
    //                     (sqlTx, res) => {
    //                     console.log("spells retrieved successfully");
    //                     let len = res.rows.length;
    //                     if(len > 0){
    //                         let results = (res.rows.item(0).NumberOfClasses)
    //                         setClassCount(results);
    //                     }
    //                     },
    //                     error=>{console.log('error on getting categories ' + error.message)}
    //             )
    //         })
    // }
    
    const showSpellModal = () => {
        setSpellModalVisible(true);
        setModalVisible(true);
    };
    const hideSpellModal = () => {
        setSpellModalVisible(false);
        setModalVisible(false);
    };
    const tempRenderSpells = [];
    const handleModalContent = (classTitle) => {
        console.log("class title " + classTitle);
        getFilteredSpells(classTitle);
        const renderSpellModals = () => {
            console.log(filteredSpellData.length);
            for(let i = 0; i < filteredSpellData.length; i++){
                console.log("hello from for loop!");
                tempRenderSpells.push(
                    <BasicCard 
                        key={i}
                        title={filteredSpellData[i].SpellName}
                        content={filteredSpellData[i].Class}
                        description={"Level: " + filteredSpellData[i].Level + " Range: " + filteredSpellData[i].Range}
                        functionPass={console.log("There's no function to pass!")}
                    />
                );
            }
            console.log("for loop completed! " + classTitle);
            setRenderSpells(tempRenderSpells);
        };
        renderSpellModals();
        console.log(tempRenderSpells);
        showSpellModal();
    };
    const renderButtons = [];
    for(let i=0; i < classList.length; i++){
        //console.log("For loop class: " + classList.length + " Index: " + i);
        renderButtons.push(
            <ScreenButton 
                key={i}
                title={classList[i]}
                functionPass={handleModalContent}
            />
        )
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
            <ScrollView style={styles.scrollContainer}>
                {renderButtons}
                <TouchableOpacity onPress={showSpellModal} style={styles.modalCloseButton}>
                    <Text style={styles.modalCloseText}>Spells!</Text>
                </TouchableOpacity>
            </ScrollView>
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
    scrollContainer: {
        flex: 1,
        // height: '80%',
        // width: '80%',
        // justifyContent: 'center',
        // alignItems: 'center',
        margin: 'auto',
    },
    categoryHeader:{
        fontSize: 20,
        fontWeight: 'bold',
    },
    overlay:{
        width: '100%',
        height: '100%',
        paddingTop: '-10%',
        paddingHorizontal: '-3%',
        backgroundColor: 'rgba(60, 60, 60, 0.1)',
        zIndex: 98,
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