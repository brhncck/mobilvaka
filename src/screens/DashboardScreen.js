import { useEffect, useState } from "react";
import { Text, View, ScrollView, StyleSheet, Image } from "react-native";
import { getData } from "../storage";
import { useIsFocused } from "@react-navigation/native";
import TableComponent from "../components/Table";

const DashboardScreen = () => {
    const isFocused = useIsFocused();
    const [storedData, setStoredData] = useState([]);

    useEffect(() => {
        isFocused && (async () => setStoredData(await getData()))();
    }, [isFocused]);
    return (
        <View style={styles.container}>
            <ScrollView style={styles.innerContainer}>
                <TableComponent tableData={storedData?.map(e => { return [e.userId, e.fullName, e.gender, e.phoneNumber] })} />
            </ScrollView>
        </View>
    );
};
export default DashboardScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    innerContainer: {
        flex: 1,
    },
    text: {
        fontSize: 14,
        fontWeight: "600"
    }
});
