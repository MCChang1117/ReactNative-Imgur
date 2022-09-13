import { StyleSheet, View } from 'react-native';
import { ImageInfos } from './components/ImageInfo';

export default function App() {
  return (
    <View style={styles.appContainer}>
      <ImageInfos />
    </View>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    padding: 50,
    paddingHorizontal: 16
  }
});