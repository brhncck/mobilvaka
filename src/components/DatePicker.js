import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import { Text, TouchableOpacity } from "react-native";
import { format } from "date-fns";
import { useField } from "formik";

export const DefaultDatePicker = ({ label }) => {
    const [field, meta, helpers] = useField("birthday");
    const { value } = meta;
    const { setValue } = helpers;

    const onChange = (event, selectedDate) => {
        setValue(selectedDate);
    };

    const showMode = (currentMode) => {
        DateTimePickerAndroid.open({
            value: value,
            onChange,
            mode: currentMode,
            is24Hour: true,
        });
    };

    const showDatepicker = () => {
        showMode("date");
    };

    return (
        <TouchableOpacity
            style={{ marginTop: 20, width: "100%" }}
            onPress={showDatepicker}>
            <Text>{label}</Text>
            <Text
                style={{
                    marginTop: 10,
                    paddingVertical: 8,
                    paddingHorizontal: 10,
                    borderWidth: 1,
                    borderColor: "black",
                    borderRadius: 12,
                }}>
                {format(value, "MMMM do yyyy")}
            </Text>
        </TouchableOpacity>
    );
};
