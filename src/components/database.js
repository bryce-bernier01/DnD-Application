import * as SQLite from 'expo-sqlite';
import * as Sharing from 'expo-sharing';
import * as FileSystem from 'expo-file-system';
import { useState, useEffect } from 'react';

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
    const sqlClassStatements = [
        'INSERT INTO "classes" ("name", "primaryAbility", "primaryAbility2", "savingThrows", "hitDice") VALUES ("Cleric", "Wisdom", "", "Wisdom & Charisma", "d8")',
        'INSERT INTO "classes" ("name", "primaryAbility", "primaryAbility2", "savingThrows", "hitDice") VALUES ("Druid", "Wisdom", "", "Intelligence & Wisdom", "d8")',
        'INSERT INTO "classes" ("name", "primaryAbility", "primaryAbility2", "savingThrows", "hitDice") VALUES ("Fighter", "Strength", "Dexterity", "Strength & Constitution", "d10")',
        'INSERT INTO "classes" ("name", "primaryAbility", "primaryAbility2", "savingThrows", "hitDice") VALUES ("Paladin", "Strength", "Charisma", "Wisdom & Charisma", "d10")',
        'INSERT INTO "classes" ("name", "primaryAbility", "primaryAbility2", "savingThrows", "hitDice") VALUES ("Barbarian", "Strength", "", "Strength & Constitution", "d12")',
        'INSERT INTO "classes" ("name", "primaryAbility", "primaryAbility2", "savingThrows", "hitDice") VALUES ("Wizard", "Intelligence", "", "Intelligence & Wisdom", "d6")',
        'INSERT INTO "classes" ("name", "primaryAbility", "primaryAbility2", "savingThrows", "hitDice") VALUES ("Artificer", "Intelligence", "", "Constitution & Intelligence", "d8")',
        'INSERT INTO "classes" ("name", "primaryAbility", "primaryAbility2", "savingThrows", "hitDice") VALUES ("Monk", "Dexterity", "Wisdom", "Strength &  Dexterity", "d8")',
        'INSERT INTO "classes" ("name", "primaryAbility", "primaryAbility2", "savingThrows", "hitDice") VALUES ("Ranger", "Dexterity", "Wisdom", "Strength &  Dexterity", "d10")',
        'INSERT INTO "classes" ("name", "primaryAbility", "primaryAbility2", "savingThrows", "hitDice") VALUES ("Rouge", "Dexterity ", "", "Dexterity & Intelligence", "d8")',
        'INSERT INTO "classes" ("name", "primaryAbility", "primaryAbility2", "savingThrows", "hitDice") VALUES ("Bard", "Charisma", "", "Dexterity & Charisma", "d8")',
        'INSERT INTO "classes" ("name", "primaryAbility", "primaryAbility2", "savingThrows", "hitDice") VALUES ("Sorcerer", "Charisma", "", "Constitution & Charisma", "d6")',
        'INSERT INTO "classes" ("name", "primaryAbility", "primaryAbility2", "savingThrows", "hitDice") VALUES ("Warlock", "Charisma", "", "Wisdom & Charisma", "d8")'
    ]
    const sqlSpellStatements = [
        'INSERT INTO "spells" ("SpellName", "Level", "Class", "Range") VALUES ("Unseen Servant", "1", "Bard", "60 feet")',
        'INSERT INTO "spells" ("SpellName", "Level", "Class", "Range") VALUES ("Bane", "1", "Cleric", "30 Feet")',
        'INSERT INTO "spells" ("SpellName", "Level", "Class", "Range") VALUES ("Command", "1", "Cleric", "60 Feet")',
        'INSERT INTO "spells" ("SpellName", "Level", "Class", "Range") VALUES ("Cure Wounds", "1", "Cleric", "Touch")',
        'INSERT INTO "spells" ("SpellName", "Level", "Class", "Range") VALUES ("Detect Evil and Good ", "1", "Cleric", "Self")',
        'INSERT INTO "spells" ("SpellName", "Level", "Class", "Range") VALUES ("Compelled Duel", "1", "paladins", "30 Feet")',
        'INSERT INTO "spells" ("SpellName", "Level", "Class", "Range") VALUES ("Comprehend Languages", "1", "Sorcerer", "Self")',
        'INSERT INTO "spells" ("SpellName", "Level", "Class", "Range") VALUES ("Comprehend Languages", "1", "Warlock", "Self")',
        'INSERT INTO "spells" ("SpellName", "Level", "Class", "Range") VALUES ("Comprehend Languages", "1", "Wizard", "Self")',
        'INSERT INTO "spells" ("SpellName", "Level", "Class", "Range") VALUES ("Create or Destroy Water", "1", "Cleric", "30 feet")',
        'INSERT INTO "spells" ("SpellName", "Level", "Class", "Range") VALUES ("Create or Destroy Water", "1", "Druid", "30 feet")',
        'INSERT INTO "spells" ("SpellName", "Level", "Class", "Range") VALUES ("Silent Image", "1", "Sorcerer", "60 feet")',
        'INSERT INTO "spells" ("SpellName", "Level", "Class", "Range") VALUES ("Silent Image", "1", "Wizard", "60 feet")',
        'INSERT INTO "spells" ("SpellName", "Level", "Class", "Range") VALUES ("Detect Evil and Good ", "1", "Paladin", "Self")',
        'INSERT INTO "spells" ("SpellName", "Level", "Class", "Range") VALUES ("Detect Magic", "1", "Artificer", "Self")',
        'INSERT INTO "spells" ("SpellName", "Level", "Class", "Range") VALUES ("Detect Magic", "1", "Cleric", "Self")',
        'INSERT INTO "spells" ("SpellName", "Level", "Class", "Range") VALUES ("Detect Magic", "1", "Druid", "Self")',
        'INSERT INTO "spells" ("SpellName", "Level", "Class", "Range") VALUES ("Detect Magic", "1", "Paladin", "Self")',
        'INSERT INTO "spells" ("SpellName", "Level", "Class", "Range") VALUES ("Detect Magic", "1", "Ranger", "Self")',
        'INSERT INTO "spells" ("SpellName", "Level", "Class", "Range") VALUES ("Detect Magic", "1", "Sorcerer", "Self")',
        'INSERT INTO "spells" ("SpellName", "Level", "Class", "Range") VALUES ("Detect Magic", "1", "Wizard", "Self")',
        'INSERT INTO "spells" ("SpellName", "Level", "Class", "Range") VALUES ("Disguise Self", "1", "Artificer", "Self")',
        'INSERT INTO "spells" ("SpellName", "Level", "Class", "Range") VALUES ("Disguise Self", "1", "Sorcerer", "Self")'
    ]

    useEffect(() => {
        //initialize tables
        db.transaction(tx => {
            tx.executeSql('CREATE TABLE IF NOT EXISTS "races" ( "id" INTEGER NOT NULL UNIQUE, "race" TEXT NOT NULL, "size" TEXT NOT NULL, "speed" INTEGER NOT NULL, "type" TEXT NOT NULL, "strength" INTEGER, "constitution" INTEGER, "dexterity" INTEGER, "intelligence" INTEGER, "wisdom" INTEGER, "charisma" INTEGER, "language1" TEXT, "language2" TEXT, "language3" TEXT, PRIMARY KEY("id" AUTOINCREMENT) )');
            tx.executeSql('CREATE TABLE IF NOT EXISTS "classes" ( "name" TEXT, "primaryAbility" TEXT, "primaryAbility2" TEXT, "savingThrows" TEXT, "hitDice" TEXT )');
            tx.executeSql('CREATE TABLE IF NOT EXISTS "PlayerCharacters" ( "id" INTEGER NOT NULL UNIQUE, "name" TEXT, "race" TEXT, "class" TEXT, "experience" INTEGER, "level" INTEGER, "strength" INTEGER, "dexterity" INTEGER, "constitution" INTEGER, "intelligence" INTEGER, "wisdom" INTEGER, "charisma" INTEGER, "hitPoints" INTEGER, "acrobatics" INTEGER, "animalHandling" INTEGER, "arcana" INTEGER, "athletics" INTEGER, "deception" INTEGER, "history" INTEGER, "insight" INTEGER, "intimidation" INTEGER, "investigation" INTEGER, "medicine" INTEGER, "nature" INTEGER, "perception" INTEGER, "performance" INTEGER, "persuasion" INTEGER, "religion" INTEGER, "sleightOfHand" INTEGER, "stealth" INTEGER, "survival" INTEGER, PRIMARY KEY("id" AUTOINCREMENT) )');
            tx.executeSql('CREATE TABLE IF NOT EXISTS "spells" ( "SpellName" TEXT NOT NULL, "Level" TEXT NOT NULL, "Class" INTEGER, "Description" TEXT, "Range" TEXT, "AtHigherLevels" TEXT, "Components" TEXT, "CastingTime" TEXT, "Duration" TEXT )');
        });
        //insert data into tables
        db.transaction(tx => {
            tx.executeSql('SELECT COUNT(*) as count FROM races;', [], (_, result) =>{
                const rowCount = result.rows.item(0).count;
                console.log(rowCount);
    
                if(rowCount < sqlRacesStatements.length){
                    sqlRacesStatements.forEach(async (sqlStatement) => {
                        try {
                            await tx.executeSql(sqlStatement);
                            console.log("Executed Races Statement");
                        } catch (error) {
                            console.error('Error executing SQL statement:', error);
                        }
                    });
                }
            })
        });
        db.transaction(tx => {
            tx.executeSql('SELECT COUNT(*) as count FROM classes;', [], (_, result) =>{
                const rowCount = result.rows.item(0).count;
                console.log(rowCount);
    
                if(rowCount < sqlClassStatements){
                    sqlClassStatements.forEach(async (sqlStatement) => {
                        try {
                            await tx.executeSql(sqlStatement);
                            console.log("Executed Classes Statement");
                        } catch (error) {
                            console.error('Error executing SQL statement:', error);
                        }
                    });
                }
            })
        });
        db.transaction(tx => {
            tx.executeSql('SELECT COUNT(*) as count FROM PlayerCharacters;', [], (_, result) =>{
                const rowCount = result.rows.item(0).count;
                console.log(rowCount);
            })
        });
        db.transaction(tx => {
            tx.executeSql('SELECT COUNT(*) as count FROM spells;', [], (_, result) =>{
                const rowCount = result.rows.item(0).count;
                console.log(rowCount);
    
                if(rowCount < sqlSpellStatements){
                    sqlSpellStatements.forEach(async (sqlStatement) => {
                        try {
                            await tx.executeSql(sqlStatement);
                            console.log("Executed Classes Statement");
                        } catch (error) {
                            console.error('Error executing SQL statement:', error);
                        }
                    });
                }
            })
        });
        // db.transaction(tx => {
        //     sqlClassStatements.forEach(async (sqlStatement) => {
        //     try {
        //         await tx.executeSql(sqlStatement);
        //         console.log("Executed Classes Statement");
        //     } catch (error) {
        //         console.error('Error executing SQL statement:', error);
        //     }
        //     });
        //     getCategories();
        // });
        // const getCategories = () => {
        //     db.transaction(tx => {
        //         tx.executeSql(
        //             'SELECT name FROM "classes" WHERE name == "Cleric"',
        //             [],
        //             (sqlTx, res) => {
        //                 console.log("classes retrieved successfully");
        //                 let len = res.rows.length;
        //                 console.log(len);
        //                 // if(len > 0){
        //                 //     let results = [];
        //                 //     for(let i = 0; i < len; i++){
        //                 //         let item = res.rows.item(i);
        //                 //         results.push({id: item.id, name: item.name})
        //                 //     }
        //                 //     setNames(results);
        //                 // }
        //             },
        //             error=>{console.log('error on getting categories ' + error.message)}
        //         )
        //     })
        // }
        // getCategories();
        // db.transaction(tx => {
        //     tx.executeSql('DELETE FROM PlayerCharacters;', [], (_, result) => {
        //         console.log('Rows deleted:', result.rowsAffected);
        //     });
        // });
        //     db.transaction(tx => {
        //         tx.executeSql('DROP TABLE IF EXISTS PlayerCharacters;');
        //         console.log("PlayerCharacters deleted");
        // });

        setIsLoading(false);
    }, []);
    if(isLoading){
        console.log("loading names...");
    };

    // CAUTION!! - DO NOT UNCOMMENT
    //
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