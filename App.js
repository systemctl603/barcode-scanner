import { BarCodeScanner } from "expo-barcode-scanner";
import * as Permissions from "expo-permissions";
import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { StyleSheet, Image, Text, View, Button } from "react-native";

export default function App() {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  const handleScan = ({ data }) => {
    Alert.alert(`Data: ${data}`);
  };

  return (
    <View style={styles.container}>
      <Image source={require("./assets/scanner.jpg")} style={styles.image} />
      <Text style={styles.title}>Bar Code Scanner</Text>
      <View style={styles.button}>
        <Button
          title="Get Permissions"
          onPress={async () => {
            const { status } = await Permissions.getAsync(Permissions.CAMERA);
            setHasPermission(status === "granted");
          }}
        />
        <BarCodeScanner onBarCodeScanned={scanned ? undefined : handleScan} />
        {scanned && (
          <Button title="Scan Again" onPress={() => setScanned(false)} />
        )}
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    display: "flex",
    width: 250,
  },
  image: {
    width: 250,
    height: 250,
  },
  title: {
    fontSize: 25,
  },
});
