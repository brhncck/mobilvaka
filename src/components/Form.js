import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
} from "react-native";

import React, { useEffect, useState } from "react";
import { Picker } from "@react-native-picker/picker";
import { DefaultInputType } from "../constants/Enums";
import { DefaultDatePicker } from "../components/DatePicker";
import { DefaultDropDown } from "../components/DropDown";
import { DefaultTextInput } from "../components/TextInput";
import Checkbox from 'expo-checkbox';
import { useNavigation } from "@react-navigation/native";

export default function Form({ handleChange, userInfos, setUserInfos, countries, cities, isReadKvkk, setIsReadKvkk, isCheckedKvkk, setIsCheckedKvkk, selectPdfFile, selectedPdf }) {

    const genders = ["Erkek", "Kadın"];
    const navigation = useNavigation();

    return (
        <View>
            <DefaultTextInput
                label={"Ad Soyad"}
                value={userInfos.fullName}
                setValue={handleChange("fullName")}
            />

            <DefaultDropDown
                label={"Ülke"}
                value={userInfos.country}
                child={countries
                    ?.sort((a, b) => a.name - b.name)
                    ?.map((item, index) => {
                        return (
                            <Picker.Item
                                key={index}
                                label={item.name}
                                value={item.iso2}
                            />
                        );
                    })}
                setValue={handleChange("country")}
            />
            {console.log(cities)}
            {userInfos.country != "" && (
                <DefaultDropDown
                    label={"İl"}
                    value={userInfos.city}
                    child={cities
                        ?.sort((a, b) => a.name - b.name)
                        ?.map((item, index) => {
                            return <Picker.Item key={index} label={item} value={item} />;
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

            <DefaultTextInput
                label={"Telefon Numarası"}
                value={userInfos.phoneNumber}
                defaultInputType={DefaultInputType.phone}
                setValue={handleChange("phoneNumber")}
            />

            <DefaultDatePicker
                label={"Doğum Tarihi"}
                value={userInfos.birthday}
                setValue={handleChange("birthday")}
            />

            <DefaultDropDown
                label={"Cinsiyet"}
                value={userInfos.gender}
                child={genders?.map((item, index) => {
                    return <Picker.Item key={index} label={item} value={item} />;
                })}
                setValue={handleChange("gender")}
            />

            <View style={styles.horizontialContainer}>
                <Checkbox
                    value={isCheckedKvkk}
                    onValueChange={(value) => {
                        if (isReadKvkk) {
                            setIsCheckedKvkk(value);
                        }
                    }}
                    color={isCheckedKvkk ? '#142143' : undefined}
                />
                <TouchableOpacity
                    onPress={() => {
                        setIsReadKvkk(true);
                        navigation.navigate('Contract');
                    }}
                >
                    <Text style={{
                        fontSize: 16,
                        fontWeight: 600,
                        marginLeft: 10,
                    }}>KVKK Metnini Okudum Onaylıyorum.</Text>
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
                <Text style={{ fontSize: 12, fontWeight: 600 }}>CV Yükle</Text>
                <View style={styles.horizontialContainerWithBorder}>
                    <Text style={{
                        color: "black",
                        alignSelf: "center",
                        alignContent: "center",
                        fontSize: 16,
                        fontWeight: 600,
                        width: "60%"
                    }}>{selectedPdf}</Text>

                    <TouchableOpacity
                        style={{
                            marginVertical: 4, paddingVertical: 10,
                            alignContent: "center", borderRadius: 12, width: "40%", backgroundColor: "#142143"
                        }}
                        onPress={() => selectPdfFile()}
                    >
                        <Text style={{
                            color: "white",
                            alignSelf: "center",
                            alignContent: "center",
                            fontSize: 14,
                            fontWeight: 400,
                        }}>CV Seç</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        alignContent: "center",
        marginTop: 20
    },
    horizontialContainer: {
        alignContent: "center", flexDirection: 'row', marginTop: 20,
    },
    horizontialContainerWithBorder: {
        width: "100%",
        borderWidth: 1,
        borderColor: "black",
        borderRadius: 12,
        marginTop: 10,
        flexDirection: 'row',
        paddingHorizontal: 6,
    }
});
