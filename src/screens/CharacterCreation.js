import React, {useState, useEffect} from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, ScrollView, TextInput, Image, onPress } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import BasicCard from '../components/BasicCard';
import * as SQLite from 'expo-sqlite';


const CharacterCreation = () => {
    const [selectedClass, setSelectedClass] = useState("Select Class");
    const [modalVisible, setModalVisible] = useState(false);
    const [raceModalVisible, setRaceModalVisible] = useState(false);
    const [classModalVisible, setClassModalVisible] = useState(false);
    const [selectedRace, setSelectedRace] = useState("Select Race");
    const [raceData, setRaceData] = useState([]);
    const [classData, setClassData] = useState([]);
    const [characterName, setCharacterName] = useState('');
    const [strengthBonus, setStrengthBonus] = useState(0);
    const [dexterityBonus, setDexterityBonus] = useState(0);
    const [constitutionBonus, setConstitutionBonus] = useState(0);
    const [intelligenceBonus, setIntelligenceBonus] = useState(0);
    const [wisdomBonus, setWisdomBonus] = useState(0);
    const [charismaBonus, setCharismaBonus] = useState(0);
    const [characterStrength, setCharacterStrength] = useState();
    const [characterDexterity, setCharacterDexterity] = useState();
    const [characterConstitution, setCharacterConstitution] = useState();
    const [characterIntelligence, setCharacterIntelligence] = useState();
    const [characterWisdom, setCharacterWisdom] = useState();
    const [characterCharisma, setCharacterCharisma] = useState();

    const showRaceModal = () => {
        setRaceModalVisible(true);
        setModalVisible(true);
    };
    const hideRaceModal = () => {
        setRaceModalVisible(false);
        setModalVisible(false);
    };
    const showClassModal = () => {
        setClassModalVisible(true);
        setModalVisible(true);
    };
    const hideClassModal = () => {
        setClassModalVisible(false);
        setModalVisible(false);
    };
    useEffect(()=> {
        const db = SQLite.openDatabase('dndDatabase.db');
        const getRaces = () => {
                db.transaction(tx => {
                    tx.executeSql(
                        'SELECT race, type, strength, constitution, dexterity, intelligence, wisdom, charisma  FROM "races"',
                        [],
                        (sqlTx, res) => {
                        console.log("races retrieved successfully");
                        let len = res.rows.length;
                        if(len > 0){
                            let results = [];
                            for(let i = 0; i < len; i++){
                                let item = res.rows.item(i);
                                results.push({race: item.race, type: item.type, strength: item.strength, constitution: item.constitution, dexterity: item.dexterity, intelligence: item.intelligence, wisdom: item.wisdom, charisma: item.charisma})
                            }
                            setRaceData(results);
                        }
                        },
                        error=>{console.log('error on getting categories ' + error.message)}
                )
            })
        }
        const getClasses = () => {
                db.transaction(tx => {
                    tx.executeSql(
                        'SELECT name, primaryAbility, primaryAbility2 FROM "classes"',
                        [],
                        (sqlTx, res) => {
                        console.log("classes retrieved successfully");
                        let len = res.rows.length;
                        console.log(len);
                        if(len > 0){
                            let results = [];
                            for(let i = 0; i < len; i++){
                                let item = res.rows.item(i);
                                results.push({name: item.name, primaryAbility: item.primaryAbility, primaryAbility2: item.primaryAbility2})
                            }
                            setClassData(results);
                        }
                        },
                        error=>{console.log('error on getting categories ' + error.message)}
                )
            })
        }
        getRaces();
        getClasses();
    }, []);
    const handleRaceClick = (title) => {
        setSelectedRace(title);
        console.log(selectedRace);
        setRaceModalVisible(false);
        setModalVisible(false);
    }
    const handleClassClick = (title) => {
        setSelectedClass(title);
        console.log(selectedClass);
        setClassModalVisible(false);
        setModalVisible(false);
        getClassIcon(selectedClass);
    }

    const handleRaceAttributeBonus = (attribute) => {
        let raceDescriptionString = '';
        
        if(attribute.strength != 0){
            raceDescriptionString += `Strength: +${attribute.strength} `;
        }
        if(attribute.constitution != 0){
            raceDescriptionString += `Constitution: +${attribute.constitution} `;
        }
        if(attribute.dexterity != 0){
            raceDescriptionString += `Dexterity: +${attribute.dexterity} `;
        }
        if(attribute.intelligence != 0){
            raceDescriptionString += `Intelligence: +${attribute.intelligence} `;
        }
        if(attribute.wisdom != 0){
            raceDescriptionString += `Wisdom: +${attribute.wisdom} `;
        }
        if(attribute.charisma != 0){
            raceDescriptionString += `Charisma: +${attribute.charisma} `;
        }
        // setStrengthBonus(attribute.strength);
        // setConstitutionBonus(attribute.constitution);
        // setDexterityBonus(attribute.dexterity);
        // setIntelligenceBonus(attribute.intelligence);
        // setWisdomBonus(attribute.wisdom);
        // setCharismaBonus(attribute.charisma);

        return raceDescriptionString;
    }
    const renderRaces = [];
    for(let i = 0; i < raceData.length; i++){
        renderRaces.push(
            <BasicCard 
                key={i}
                title={raceData[i].race}
                content={raceData[i].type}
                description={handleRaceAttributeBonus(raceData[i])}
                functionPass={handleRaceClick}
            />
        );
    }
    const renderClasses = [];
        for(let i = 0; i < classData.length; i++){
            renderClasses.push(
                <BasicCard 
                    key={i}
                    title={classData[i].name}
                    content={classData[i].primaryAbility}
                    description="this is the description"
                    functionPass={handleClassClick}
                />
            );
        }
    
    const generateAttributeScore = () => {
        return Math.floor(Math.random() * 16) + 3; // Generates a number between 3 and 18 (inclusive)
    };

    // Example usage
    // const randomAttributeScore = generateAttributeScore();
    // console.log(randomAttributeScore);

    const getClassIcon= (className) => {
        switch (className){
            case 'Artificer':
                return <Image source={require('../classIcons/artificerIcon.png')} style={styles.iconImage}/>
            case 'Barbarian':
                return <Image source={require('../classIcons/barbarianIcon.png')} style={styles.iconImage}/>
            case 'Bard':
                return <Image source={require('../classIcons/bardIcon.png')} style={styles.iconImage}/>
            case 'Cleric':
                return <Image source={require('../classIcons/clericIcon.png')} style={styles.iconImage}/>
            case 'Druid':
                return <Image source={require('../classIcons/druidIcon.png')} style={styles.iconImage}/>
            case 'Fighter':
                return <Image source={require('../classIcons/fighterIcon.png')} style={styles.iconImage}/>
            case 'Monk':
                return <Image source={require('../classIcons/monkIcon.png')} style={styles.iconImage}/>
            case 'Paladin':
                return <Image source={require('../classIcons/paladinIcon.png')} style={styles.iconImage}/>
            case 'Ranger':
                return <Image source={require('../classIcons/rangerIcon.png')} style={styles.iconImage}/>
            case 'Rogue':
                return <Image source={require('../classIcons/rogueIcon.png')} style={styles.iconImage}/>
            case 'Sorcerer':
                return <Image source={require('../classIcons/sorcererIcon.png')} style={styles.iconImage}/>
            case 'Warlock':
                return <Image source={require('../classIcons/warlockIcon.png')} style={styles.iconImage}/>
            case 'Wizard':
                return <Image source={require('../classIcons/wizardIcon.png')} style={styles.iconImage}/>
            default:
                return <Image source={require('../classIcons/artificerIcon.png')} style={styles.iconImage}/>
        }
    }

    const createCharacter = () =>{
        console.log("Creating character...");
        const db = SQLite.openDatabase('dndDatabase.db');
        console.log("Values: " + [characterName, selectedRace, selectedClass, 0, 1, characterStrength, characterDexterity, characterConstitution, characterIntelligence, characterWisdom, characterCharisma])
        db.transaction(tx => {
        tx.executeSql(`INSERT INTO PlayerCharacters (name, race, class, experience, level, strength, dexterity, constitution, intelligence, wisdom, charisma) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`, [characterName, selectedRace, selectedClass, 0, 1, characterStrength, characterDexterity, characterConstitution, characterIntelligence, characterWisdom, characterCharisma], (tx, results) => {
            if (results.rowsAffected > 0) {
                console.log('Character saved successfully!');
            } else {
                console.log('Failed to save character.');
            }
        });
        });
    }
    const checkName = () =>{
        console.log(characterName);
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
            <View style={styles.classIcon}>
                {getClassIcon(selectedClass)}
            </View>
            <View style={styles.categoryContainer}>
                <Text style={styles.categoryHeader}>Name:</Text>
                <TextInput
                    style={styles.nameInput}
                    placeholder="Enter Name"
                    value={characterName}
                    onChangeText={text => setCharacterName(text)}
                />
            </View>
            <View style={styles.categoryContainer}>
                <Text style={styles.categoryHeader}>Race:</Text>
                <TouchableOpacity onPress={showRaceModal} style={styles.categoryButton}>
                    <Text style={styles.categoryButtonText}>{selectedRace}</Text>
                </TouchableOpacity>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={raceModalVisible}
                    onRequestClose={hideRaceModal}
                >
                    <View style={styles.modalContainer}>
                        <View style={styles.modalContent}>
                            <ScrollView style={styles.modalScrollContainer}>
                                {renderRaces}
                            </ScrollView>
                            <TouchableOpacity style={styles.modalCloseButton} onPress={hideRaceModal}>
                                <Text style={styles.modalCloseText}>Close</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
            </View>
            <View style={styles.categoryContainer}>
                <Text style={styles.categoryHeader}>Class:</Text>
                <TouchableOpacity onPress={showClassModal} style={styles.categoryButton}>
                    <Text style={styles.categoryButtonText}>{selectedClass}</Text>
                </TouchableOpacity>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={classModalVisible}
                    onRequestClose={hideClassModal}
                >
                    <View style={styles.modalContainer}>
                        <View style={styles.modalContent}>
                            <ScrollView style={styles.modalScrollContainer}>
                                {renderClasses}
                            </ScrollView>
                            <TouchableOpacity style={styles.modalCloseButton} onPress={hideClassModal}>
                                <Text style={styles.modalCloseText}>Close</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
            </View>
            <View style={styles.attributeContainer}>
                <View style={styles.attributesBoxes}>
                    <TouchableOpacity onPress={()=> setCharacterStrength(generateAttributeScore)}>
                        <Text style={styles.attributes}>Strength</Text>
                        <Text style={[styles.textStyling, styles.textBottom]}>{characterStrength}</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.attributesBoxes}>
                    <TouchableOpacity onPress={()=> setCharacterDexterity(generateAttributeScore)}>
                        <Text style={styles.attributes}>Dexterity</Text>
                        <Text style={[styles.textStyling, styles.textBottom]}>{characterDexterity}</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.attributesBoxes}>
                    <TouchableOpacity onPress={()=> setCharacterConstitution(generateAttributeScore)}>
                        <Text style={styles.attributes}>Constitution</Text>
                        <Text style={[styles.textStyling, styles.textBottom]}>{characterConstitution}</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.attributeContainer}>
                <View style={styles.attributesBoxes}>
                    <TouchableOpacity onPress={()=> setCharacterIntelligence(generateAttributeScore)}>
                        <Text style={styles.attributes}>Intelligence</Text>
                        <Text style={[styles.textStyling, styles.textBottom]}>{characterIntelligence}</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.attributesBoxes}>
                    <TouchableOpacity onPress={()=> setCharacterWisdom(generateAttributeScore)}>
                        <Text style={styles.attributes}>Wisdom</Text>
                        <Text style={[styles.textStyling, styles.textBottom]}>{characterWisdom}</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.attributesBoxes}>
                    <TouchableOpacity onPress={()=> setCharacterCharisma(generateAttributeScore)}>
                        <Text style={styles.attributes}>Charisma</Text>
                        <Text style={[styles.textStyling, styles.textBottom]}>{characterCharisma}</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View>
                <TouchableOpacity style={styles.modalCloseButton} onPress={createCharacter}>
                    <Text style={styles.modalCloseText}>Submit!</Text>
                </TouchableOpacity>
            </View>
            {/* <TouchableOpacity onPress={checkName}>
                <Text>Check name</Text>
            </TouchableOpacity> */}
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
    classIcon:{
        alignItems: 'center',
    },
    iconImage:{
        width: 130,
        height: 130,
    },
    nameInput:{
        backgroundColor: 'rgba(0, 0, 0, 0.1)',
        width: 100,
        textAlign: 'center',
        borderRadius: 5,
        fontSize: 16,
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
    textBottom: {
        paddingTop: 5,
        textAlign: 'center',
        color: '#2C1B47',
    },
    attributesBoxes:{
        marginLeft: 1,
        marginHorizontal: 4,
        width: '33%',
        backgroundColor: '#DBCBE8',
        borderRadius: 4,
    },
    attributes:{
        fontSize: 10,
        fontWeight: '800',
        textAlign: 'center',
        color: '#2C1B47',
    },
    attributeContainer: {
        paddingTop: 20,
        paddingBottom: 20,
        flexDirection: 'row'
    },
})
export default CharacterCreation;