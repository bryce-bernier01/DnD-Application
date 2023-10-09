import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import NavigationBar from './src/components/NavigationBar';

const App = () => {
  return (
    <View style={styles.container}>
      <View style={styles.NavBar}>
        <NavigationBar />
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#DBCBE8',
  },
  NavBar: {
    marginTop: 'auto'
  }
});

export default App;