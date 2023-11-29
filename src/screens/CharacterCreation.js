import React, {useState, useEffect} from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, ScrollView, onPress } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';
import BasicCard from '../components/BasicCard';
import * as SQLite from 'expo-sqlite';


const CharacterCreation = () => {
    const [selectedClass, setSelectedClass] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedRace, setSelectedRace] = useState("Select Race");
    const [raceData, setRaceData] = useState([]);

    const showModal = () => {
        setModalVisible(true);
    };
    const hideModal = () => {
        setModalVisible(false);
    };
    useEffect(()=> {
        const db = SQLite.openDatabase('dndDatabase.db');
        const getRaces = () => {
                db.transaction(tx => {
                    tx.executeSql(
                        'SELECT race, type FROM "races"',
                        [],
                        (sqlTx, res) => {
                        console.log("races retrieved successfully");
                        let len = res.rows.length;
                        if(len > 0){
                            let results = [];
                            for(let i = 0; i < len; i++){
                                let item = res.rows.item(i);
                                results.push({race: item.race, type: item.type})
                            }
                            setRaceData(results);
                        }
                        },
                        error=>{console.log('error on getting categories ' + error.message)}
                )
            })
        }
        getRaces();
    }, []);
    const handleRaceClick = (title) => {
            setSelectedRace(title);
            console.log(selectedRace);
            setModalVisible(false);
    }
    const renderRaces = [];
    for(let i = 0; i < raceData.length; i++){
        renderRaces.push(
            <BasicCard 
                key={i}
                title={raceData[i].race}
                content={raceData[i].type}
                description="this is the description"
                functionPass={handleRaceClick}
            />
        );
    }

    const navigation = useNavigation();

    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false,
            });
    }, [navigation]);

    return (
        <View style={[styles.container, modalVisible && styles.fullScreen]}>
            {modalVisible && <View style={styles.overlay}></View>}
            <View>
                <Text>Race: </Text>
                <TouchableOpacity onPress={showModal}>
                    <Text>{selectedRace}</Text>
                </TouchableOpacity>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={hideModal}
                >
                    <View style={styles.modalContainer}>
                        <View style={styles.modalContent}>
                            <ScrollView style={styles.modalScrollContainer}>
                                {renderRaces}
                            </ScrollView>
                            <TouchableOpacity style={styles.modalCloseButton} onPress={hideModal}>
                                <Text style={styles.modalCloseText}>Close</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
            </View>
            {/* <View>
                <Text>Class: </Text>
                <TouchableOpacity onPress={showModal}>
                    <Text>Select Class</Text>
                </TouchableOpacity>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={hideModal}
                >
                    <View style={styles.modalContainer}>
                        <View style={styles.modalContent}>
                            <Text>Your modal content goes here</Text>
                            <TouchableOpacity onPress={hideModal}>
                                <Text>Close Modal</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
            </View> */}
        </View>
    );
};


const styles = StyleSheet.create({
    container:{
        paddingTop: '10%',
        paddingHorizontal: '3%',
        backgroundColor: '#DBCBE8',
        flex: 1,
    },
    fullScreen:{
        paddingTop: 0,
        paddingHorizontal: 0,
    },
    overlay:{
        width: '100%',
        height: '100%',
        paddingTop: '-10%',
        paddingHorizontal: '-3%',
        backgroundColor: 'rgba(60, 60, 60, 0.2)',
        zIndex: 98,
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
    }
})
export default CharacterCreation;