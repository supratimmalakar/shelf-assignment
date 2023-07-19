import "react-native-gesture-handler";
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, SafeAreaView, Text, View} from 'react-native';
import { useState, useEffect } from 'react';
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { DraxProvider, DraxList } from 'react-native-drax';
import DraggableItem from "./components/DraggableItem";

export default function App() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("https://dummyjson.com/products")
      .then(res => res.json())
      .then(res => setProducts(res.products))
  }, [])

  return (
    <SafeAreaView style={styles.container}>
      <GestureHandlerRootView>
        <DraxProvider>
          <StatusBar style="auto" />
          <View style={styles.header}>
            <Text style={styles.heading}>Products List</Text>
            <Text style={styles.subHeading}>Hold to drag any item. Dragged items will shake and can be dropped anywhere to be removed from the list</Text>
          </View>
          <View style={styles.listContainer}>
            <DraxList
              horizontal
              data={products}
              renderItemContent={({ item, index }) => <DraggableItem item={item} index={index} setProducts={setProducts} products={products} />}
              keyExtractor={(item, index) => index.toString()}
              scrollEnabled={true}
            />
          </View>
        </DraxProvider>
      </GestureHandlerRootView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header : {
    justifyContent : "center", 
    alignItems : "center",
    paddingHorizontal : 50,
    marginBottom : 10
  },
  heading: {
    fontSize: 32,
    fontWeight: 600,
    textAlign: "center",
    marginBottom : 5
  },
  subHeading: {
    fontSize: 12,
    fontWeight: 300,
    textAlign: "center"
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  listContainer: {
    height: 240,
    width: "100%",
  },
});
