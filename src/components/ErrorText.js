import { View, Text, } from "react-native";

export const ErrorTextInput = ({
    isClickedSubmit,
    errorMessage,
}) => {
    return (
        <View>
            {isClickedSubmit && errorMessage &&
                <Text style={{ marginTop: 10, marginLeft: 10, fontSize: 10, color: 'red' }}>{errorMessage}</Text>
            }
        </View>
    );
};
