import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { Picker } from "@react-native-picker/picker";
import { DefaultInputType } from "../constants/Enums";
import { DefaultDatePicker } from "../components/DatePicker";
import { DefaultDropDown } from "../components/DropDown";
import { DefaultTextInput } from "../components/TextInput";
import Checkbox from "expo-checkbox";
import { useNavigation } from "@react-navigation/native";
import { getCities } from "../service";
import { ErrorTextInput } from "./ErrorText";

export default function Form({
    errors,
    handleChange,
    isClickedSubmit,
    userInfos,
    countries,
    isReadKvkk,
    setIsReadKvkk,
    isCheckedKvkk,
    setIsCheckedKvkk,
    cvPath,
    selectPdfFile,
}) {
    const genders = ["Seçiniz", "Erkek", "Kadın"];
    const navigation = useNavigation();
    const [cities, setCities] = useState([]);


    useEffect(() => {
        (async () => {
            setCities(await getCities({ country: userInfos.country }))
        }
        )();
    }, [userInfos.country]);

    return (
        <View>
            <DefaultTextInput
                label={"Ad Soyad"}
                value={userInfos.fullName}
                setValue={handleChange("fullName")}
            />
            <ErrorTextInput isClickedSubmit={isClickedSubmit} errorMessage={errors.fullName} />

            <DefaultDropDown
                label={"Ülke"}
                name={"country"}
                value={userInfos.country}
                child={countries
                    ?.sort((a, b) => a.name - b.name)
                    ?.map((item, index) => {
                        return (
                            <Picker.Item
                                key={index}
                                label={item.name}
                                value={item.name}
                                enabled={index != 0}
                            />
                        );
                    })}
                setValue={handleChange("country")}
            />

            {cities && (
                <DefaultDropDown
                    label={"İl"}
                    name={"city"}
                    value={userInfos.city}
                    child={cities
                        ?.sort((a, b) => a.name - b.name)
                        ?.map((item, index) => {
                            return (
                                <Picker.Item
                                    key={index}
                                    label={item}
                                    value={item}
                                    enabled={index != 0}
                                />
                            );
                        })}
                    setValue={handleChange("city")}
                />
            )}

            <DefaultTextInput
                label={"Kimlik Numarası"}
                value={userInfos.userId}
                defaultInputType={DefaultInputType.number}
                setValue={handleChange("userId")}
            />

            <ErrorTextInput isClickedSubmit={isClickedSubmit} errorMessage={errors.userId} />

            <DefaultTextInput
                label={"Telefon Numarası"}
                value={userInfos.phoneNumber}
                defaultInputType={DefaultInputType.phone}
                setValue={handleChange("phoneNumber")}
            />

            <ErrorTextInput isClickedSubmit={isClickedSubmit} errorMessage={errors.phoneNumber} />

            <DefaultDatePicker
                label={"Doğum Tarihi"}
                value={userInfos.birthday}
                setValue={handleChange("birthday")}
            />

            <ErrorTextInput isClickedSubmit={isClickedSubmit} errorMessage={errors.birthday} />

            <DefaultDropDown
                label={"Cinsiyet"}
                name={"gender"}
                value={userInfos.gender}
                child={genders?.map((item, index) => (
                    <Picker.Item key={index} label={item} lab value={item} enabled={index != 0} />
                ))}
                setValue={handleChange("gender")}
            />

            <ErrorTextInput isClickedSubmit={isClickedSubmit} errorMessage={errors.gender} />

            <View style={styles.horizontialContainer}>
                <Checkbox
                    value={isCheckedKvkk}
                    onValueChange={(value) =>
                        isReadKvkk && setIsCheckedKvkk(value)
                    }
                    color={isCheckedKvkk ? "#142143" : undefined}
                />
                <TouchableOpacity
                    onPress={() => {
                        setIsReadKvkk(true);
                        setIsCheckedKvkk(true);
                        navigation.navigate("Contract");
                    }}>
                    <Text
                        style={{
                            fontSize: 16,
                            fontWeight: "600",
                            marginLeft: 10,
                        }}>
                        KVKK Metnini Okudum Onaylıyorum.
                    </Text>
                </TouchableOpacity>
            </View>

            <DefaultTextInput
                label={"Çalışma Bilgilerinizi Doldurunuz : "}
                isMultiLine={true}
                value={userInfos.jobInfo}
                setValue={handleChange("jobInfo")}
            />

            <DefaultTextInput
                label={"Eğitim Bilgilerinizi Doldurunuz : "}
                isMultiLine={true}
                value={userInfos.educationInfo}
                setValue={handleChange("educationInfo")}
            />

            <View style={styles.container}>
                <Text style={{ fontSize: 12, fontWeight: "600" }}>CV Yükle</Text>
                <View style={styles.horizontialContainerWithBorder}>
                    <Text
                        style={{
                            color: "black",
                            alignSelf: "center",
                            alignContent: "center",
                            fontSize: 16,
                            fontWeight: "600",
                            width: "60%",
                        }}>
                        {cvPath}
                    </Text>

                    <TouchableOpacity
                        style={{
                            marginVertical: 4,
                            paddingVertical: 10,
                            alignContent: "center",
                            borderRadius: 12,
                            width: "40%",
                            backgroundColor: "#142143",
                        }}
                        onPress={() => selectPdfFile()}>
                        <Text
                            style={{
                                color: "white",
                                alignSelf: "center",
                                alignContent: "center",
                                fontSize: 14,
                                fontWeight: "400",
                            }}>
                            CV Seç
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>

            <ErrorTextInput isClickedSubmit={isClickedSubmit} errorMessage={errors.cvPath} />

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        alignContent: "center",
        marginTop: 20,
    },
    horizontialContainer: {
        alignContent: "center",
        flexDirection: "row",
        marginTop: 20,
    },
    horizontialContainerWithBorder: {
        width: "100%",
        borderWidth: 1,
        borderColor: "black",
        borderRadius: 12,
        marginTop: 10,
        flexDirection: "row",
        paddingHorizontal: 6,
    },
});
