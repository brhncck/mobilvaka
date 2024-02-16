import { useEffect, useState } from "react";
import { Text, View, SafeAreaView, StyleSheet } from "react-native";
import { getData } from "../storage";
import { useIsFocused } from "@react-navigation/native";

const DashboardScreen = () => {
    const isFocused = useIsFocused();
    const [storedData, setStoredData] = useState([]);

    useEffect(() => {
        isFocused && (async () => setStoredData(await getData()))();
    }, [isFocused]);

    console.log(storedData);

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.innerContainer}>
                {storedData.map((item, index) => (
                    <Text key={index}>
                        {item.fullName} - {item.userId}
                    </Text>
                ))}
            </View>
        </SafeAreaView>
    );
};
export default DashboardScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    innerContainer: {
        flex: 1,
        alignItems: "center",
    },
});
