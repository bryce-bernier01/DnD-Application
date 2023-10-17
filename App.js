import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import NavigationBar from './src/components/NavigationBar';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import CharacterSheet from './src/screens/CharacterSheet'; // Import your screen components

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Character Sheet" component={CharacterSheet} />
      </Stack.Navigator>
      <View style={styles.container}>
      <View style={styles.NavBar}>
        <NavigationBar />
      </View>
      <StatusBar style="auto" />
      </View>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#DBCBE8',
  },
  NavBar: {
    marginTop: 'auto',
    zIndex: 99,
    backgroundColor: 'black',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 100,
  }
});

export default App;
