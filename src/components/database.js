import * as SQLite from 'expo-sqlite';
import * as Sharing from 'expo-sharing';
import * as FileSystem from 'expo-file-system';
import { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';

export default function initDatabase() {
    const db = SQLite.openDatabase('dndDatabase.db');
    const [isLoading, setIsLoading] = useState(true);
    const [names, setNames] = useState([]);
    const [currentName, setCurrentName] = useState(undefined);

    
    const sqlRacesStatements = [
                'INSERT INTO "races" ("id", "race", "size", "speed", "type", "strength", "constitution", "dexterity", "intelligence", "wisdom", "charisma", "language1", "language2", "language3") VALUES ("1", "Dragonborn", "Medium", "30", "Humanoid", "2", "", "", "", "", "1", "Common", "Draconic", "")',
                'INSERT INTO "races" ("id", "race", "size", "speed", "type", "strength", "constitution", "dexterity", "intelligence", "wisdom", "charisma", "language1", "language2", "language3") VALUES ("2", "Dwarf", "Medium", "25", "Humanoid/Dwarf", "", "2", "", "", "", "", "Common", "Dwarvish", "")',
                'INSERT INTO "races" ("id", "race", "size", "speed", "type", "strength", "constitution", "dexterity", "intelligence", "wisdom", "charisma", "language1", "language2", "language3") VALUES ("3", "Elf", "Medium", "30", "Humanoid/Elf", "", "", "2", "", "", "", "Common", "Elvish", "")',
                'INSERT INTO "races" ("id", "race", "size", "speed", "type", "strength", "constitution", "dexterity", "intelligence", "wisdom", "charisma", "language1", "language2", "language3") VALUES ("4", "High Elf", "Medium", "30", "Humanoid/Elf", "", "", "2", "1", "", "", "Common", "Elvish", "")',
                'INSERT INTO "races" ("id", "race", "size", "speed", "type", "strength", "constitution", "dexterity", "intelligence", "wisdom", "charisma", "language1", "language2", "language3") VALUES ("5", "Wood Elf", "Medium", "30", "Humanoid/Elf", "", "", "2", "", "1", "", "Common", "Evlish", "")',
                'INSERT INTO "races" ("id", "race", "size", "speed", "type", "strength", "constitution", "dexterity", "intelligence", "wisdom", "charisma", "language1", "language2", "language3") VALUES ("6", "Elf", "Medium", "30", "Humanoid/Dwarf", "", "", "", "", "", "", "Common", "Dwarvish", "")',
                'INSERT INTO "races" ("id", "race", "size", "speed", "type", "strength", "constitution", "dexterity", "intelligence", "wisdom", "charisma", "language1", "language2", "language3") VALUES ("7", "Half Elf", "Medium", "30", "Humanoid", "", "", "", "", "", "2", "Common", "Elvish", "Players Choice")',
                'INSERT INTO "races" ("id", "race", "size", "speed", "type", "strength", "constitution", "dexterity", "intelligence", "wisdom", "charisma", "language1", "language2", "language3") VALUES ("8", "Halfling", "Small", "25", "Humanoid", "", "", "2", "", "", "", "Common", "Halfling", "")',
                'INSERT INTO "races" ("id", "race", "size", "speed", "type", "strength", "constitution", "dexterity", "intelligence", "wisdom", "charisma", "language1", "language2", "language3") VALUES ("9", "Half Orc", "Medium", "30", "Humanoid/Orc", "2", "1", "", "", "", "", "Common", "Orc", "")',
                'INSERT INTO "races" ("id", "race", "size", "speed", "type", "strength", "constitution", "dexterity", "intelligence", "wisdom", "charisma", "language1", "language2", "language3") VALUES ("10", "Human", "Medium", "30", "Humanoid", "1", "1", "1", "1", "1", "1", "Common", "", "Players Choice")',
                'INSERT INTO "races" ("id", "race", "size", "speed", "type", "strength", "constitution", "dexterity", "intelligence", "wisdom", "charisma", "language1", "language2", "language3") VALUES ("11", "Tiefling", "Medium", "30", "Humanoid", "", "", "", "1", "", "2", "Common", "Infernal", "")'
    ]


    useEffect(() => {
        //initialize tables
        db.transaction(tx => {
            tx.executeSql('CREATE TABLE IF NOT EXISTS "races" ( "id" INTEGER NOT NULL UNIQUE, "race" TEXT NOT NULL, "size" TEXT NOT NULL, "speed" TEXT NOT NULL, "type" TEXT NOT NULL, "strength" TEXT, "constitution" TEXT, "dexterity" TEXT, "intelligence" TEXT, "wisdom" TEXT, "charisma" TEXT, "language1" TEXT, "language2" TEXT, "language3" TEXT, PRIMARY KEY("id" AUTOINCREMENT) )')
        });
        //insert data into tables
        db.transaction(tx => {
            sqlRacesStatements.forEach(async (sqlStatement) => {
            try {
                await tx.executeSql(sqlStatement);
                console.log("Executed Statement");
            } catch (error) {
                console.error('Error executing SQL statement:', error);
            }
            });
            getCategories();
        });
        const getCategories = () => {
            db.transaction(tx => {
                tx.executeSql(
                    'SELECT * FROM "races"',
                    [],
                    (sqlTx, res) => {
                        console.log("races retrieved successfully");
                        let len = res.rows.length;
                        console.log(len);
                        if(len > 0){
                            let results = [];
                            for(let i = 0; i < len; i++){
                                let item = res.rows.item(i);
                                results.push({id: item.id, name: item.name})
                            }
                            setNames(results);
                        }
                    },
                    error=>{console.log('error on getting categories ' + error.message)}
                )
            })
        }
        
        setIsLoading(false);
    }, []);
    if(isLoading){
        console.log("loading names...");
    };
    // const shareDatabase = async () => {
    //     await Sharing.shareAsync(
    //         FileSystem.documentDirectory + 'SQLite/dndDatabase.db', 
    //             {dialogTitle: 'share or copy your DB via'}
    //         ).catch(error =>{
    //             console.log(error);
    //         })
    // }
    // shareDatabase();
    // const deleteDatabase = async () => {
    //     await db.closeAsync(); // Close the database before deleting
    //     await db.deleteAsync();
    // }
    // deleteDatabase();
}