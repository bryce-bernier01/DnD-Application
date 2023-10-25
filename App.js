import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import NavigationBar from './src/components/NavigationBar';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import CharacterCatalog from './src/screens/CharacterCatalog';
import CreatureCatalog from './src/screens/CreatureCatalog';
import SpellsCatalog from './src/screens/SpellsCatalog';
import WeaponCatalog from './src/screens/WeaponCatalog';

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
        <Stack.Navigator 
          screenOptions={{
            cardStyleInterpolator: ({ current, next, layouts }) => ({
              cardStyle: {
                opacity: current.progress, // Customize the transition animation
              },
            }),
            cardStyle: {flex: 1},
          }}
        >
          <Stack.Screen name="CharacterCatalog" component={CharacterCatalog} />
          <Stack.Screen name="CreatureCatalog" component={CreatureCatalog} />
          <Stack.Screen name="SpellsCatalog" component={SpellsCatalog} />
          <Stack.Screen name="WeaponCatalog" component={WeaponCatalog} />
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
    backgroundColor: '#DBCBE8',
  },
  NavBar: {
    marginTop: 'auto',
    zIndex: 99,
  }
});

export default App;
