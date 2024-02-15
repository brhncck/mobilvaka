import { Picker } from "@react-native-picker/picker";
import { Text, View } from "react-native";

export const DefaultDropDown = ({ label, child, value, setValue }) => {
  return (
    <View
      style={{
        width: "100%",
        marginTop: 20,
      }}
    >
      <Text style={{ fontSize: 12, fontWeight: 600 }}>{label}</Text>

      <View style={{
        width: "100%",
        borderWidth: 1,
        borderColor: "black",
        borderRadius: 12,
        marginTop: 10,
        paddingBottom: 6,
      }}>
        <Picker

          style={{
            height: 48,
            alignContent: "center",
          }}
          placeholder={label}
          selectedValue={value}
          onValueChange={(itemValue, itemIndex) => setValue(itemValue)}
        >
          {child}
        </Picker>
      </View>

    </View>
  );
};
