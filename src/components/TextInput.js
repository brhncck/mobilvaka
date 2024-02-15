import { Text, TextInput, View } from "react-native";
import { DefaultInputType } from "../constants/Enums";

export const DefaultTextInput = ({
    label,
    defaultInputType = DefaultInputType.default,
    isMultiLine = false,
    value,
    setValue,
}) => {
    return (
        <View style={{ marginTop: 20, width: "100%" }}>
            <Text style={{ fontSize: 12, fontWeight: 600 }}>{label}</Text>
            <TextInput
                numberOfLines={isMultiLine ? 4 : 1}
                value={value}
                onChangeText={setValue}
                style={{
                    fontSize: 14,
                    marginTop: 10,
                    paddingVertical: 8,
                    paddingHorizontal: 10,
                    borderWidth: 1,
                    borderColor: "black",
                    borderRadius: 12,
                }}
                keyboardType={
                    defaultInputType == DefaultInputType.number
                        ? "numeric"
                        : defaultInputType == DefaultInputType.phone
                            ? "phone-pad"
                            : "default"
                }
            />
        </View>
    );
};