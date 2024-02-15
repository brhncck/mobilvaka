import {
    Text,
    View,
    SafeAreaView,
    TouchableOpacity,
    StyleSheet,
} from "react-native";

import * as React from 'react';
import { WebView } from 'react-native-webview';


const ContractScreen = ({ navigation }) => {
    return (
        <SafeAreaView style={{ flex: 1, }}>
            <View style={styles.webviewContainer}>
                <WebView
                    originWhitelist={['*']}
                    source={{ uri: "https://baykartech.com/tr/kvkk/" }}
                    style={styles.webview}
                />
                <View style={styles.container}>
                    <TouchableOpacity
                        style={{
                            paddingVertical: 10,
                            alignSelf: "center",
                            alignContent: "center", borderRadius: 12, width: "100%", backgroundColor: "#142143"
                        }}
                        onPress={() => {
                            navigation.pop();
                        }}
                    >
                        <Text style={{
                            color: "white",
                            alignSelf: "center",
                            alignContent: "center",
                            fontSize: 16,
                            fontWeight: 600,
                        }}>Tamam</Text>
                    </TouchableOpacity>
                </View>

            </View>
        </SafeAreaView>
    )
};
export default ContractScreen;
const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10
    },
    webview: {
        flex: 1,
    },
    webviewContainer: {
        flex: 1,
        alignSelf: 'stretch',
    },
});


