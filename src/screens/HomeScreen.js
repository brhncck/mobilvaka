import {
    StyleSheet,
    Text,
    View,
    Image,
    SafeAreaView,
    TouchableOpacity,
    ScrollView,
    Alert,
} from "react-native";
import * as DocumentPicker from "expo-document-picker";
import React, { useEffect, useState } from "react";
import * as ImagePicker from "expo-image-picker";
import { getData, storeData } from "../storage";
import { Formik, useFormik } from "formik";
import UserForm from "../components/Form";
import { getCountryNames } from "../service";
import { useNavigation } from "@react-navigation/native";
import * as yup from 'yup'
import { DefaultDropDown } from "../components/DropDown";

const HomeScreen = () => {
    const navigation = useNavigation();
    const defaultImageSource = require("../../assets/profile.png");

    const initialValues = {
        imageSource: "",
        fullName: "",
        country: "",
        city: "",
        userId: "",
        phoneNumber: "",
        birthday: new Date(),
        gender: "",
        jobInfo: "",
        educationInfo: "",
        cvPath: "",
    };

    const validationSchema = yup.object().shape({

        fullName: yup.string()
            .required('Ad Soyad alanı zorunludur.'),

        country: yup.string()
            .required('Ülke alanı zorunludur.'),

        city: yup.string()
            .required('Şehir alanı zorunludur.'),

        userId: yup.string()
            .required('Kimlik alanı zorunludur.'),

        phoneNumber: yup.string()
            .required('Telefon alanı zorunludur.'),

        gender: yup.string()
            .required('Cinsiyet alanı zorunludur.'),
    })

    const [imageSource, setImageSource] = useState();
    const [cvPath, setcvPath] = useState("");
    const [countries, setCountries] = useState([]);
    const [isReadKvkk, setIsReadKvkk] = useState(false);
    const [isCheckedKvkk, setIsCheckedKvkk] = useState(false);
    const [isClickedSubmit, setIsClickedSubmit] = useState(false);

    const imagePicker = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        console.log(result);

        if (!result.canceled) {
            setImageSource(result.assets[0].uri);
        }
    };

    const selectPdfFile = async () => {
        let result = await DocumentPicker.getDocumentAsync({
            type: ["application/pdf"],
        });
        setcvPath(result.assets[0].name);
    };

    useEffect(() => {
        (async () => setCountries(await getCountryNames()))();
    }, []);



    const saveUserInfo = async (userInfos) => {
        const response = await getData();

        if (!imageSource) {

            Alert.alert("Uyarı", "Lütfen resim seçiniz", [
                { text: "Tamam", onPress: () => console.log("OK Pressed") },
            ]);
            return;
        }

        userInfos.imageSource = imageSource;
        console.log(userInfos.imageSource);

        if (!isCheckedKvkk) {
            Alert.alert("Uyarı", "Lütfen KVKK metnini okuyup onaylayınız.", [
                { text: "Tamam", onPress: () => console.log("OK Pressed") },
            ]);
            return;
        }

        if (!cvPath) {
            Alert.alert("Uyarı", "Lütfen CV seçiniz.", [
                { text: "Tamam", onPress: () => console.log("OK Pressed") },
            ]);
            return;
        }

        userInfos.cvPath = cvPath;
        console.log(userInfos.imageSource);

        if (
            response != null &&
            response.findIndex((item) => item.userId == userInfos.userId) != -1
        ) {
            Alert.alert("Uyarı", "Bu Kimlik Numarası kullanılmaktadır.", [
                { text: "Tamam", onPress: () => console.log("OK Pressed") },
            ]);

            return;
        }

        storeData(userInfos).catch((e) => {
            console.log("error on submit", e);
            Alert.alert("Bir sorun oluştu. Lütfen tekrar deneyiniz..");
        });

        Alert.alert("Başırılı", "Kayıt başarıyla oluşturuldu.", [
            { text: "Tamam", onPress: () => navigation.navigate("Dashboard") },
        ]);
    };

    return (
        <SafeAreaView style={styles.container}>
            <TouchableOpacity
                style={styles.imageContainer}
                onPress={() => imagePicker()}>
                <Image
                    resizeMode="contain"
                    style={{ height: 160, width: "100%" }}
                    source={
                        imageSource == null
                            ? defaultImageSource
                            : { uri: imageSource }
                    }
                />
            </TouchableOpacity>

            <Formik
                initialValues={initialValues}
                onSubmit={(values) => saveUserInfo(values)} validationSchema={validationSchema}>

                {({ handleChange, handleSubmit, values, errors }) => (
                    <>
                        <ScrollView showsVerticalScrollIndicator={false}>
                            <UserForm
                                errors={errors}
                                handleChange={handleChange}
                                isClickedSubmit={isClickedSubmit}
                                userInfos={values}
                                countries={countries}
                                isCheckedKvkk={isCheckedKvkk}
                                isReadKvkk={isReadKvkk}
                                setIsCheckedKvkk={setIsCheckedKvkk}
                                setIsReadKvkk={setIsReadKvkk}
                                cvPath={cvPath}
                                selectPdfFile={selectPdfFile}
                            />
                        </ScrollView>
                        <TouchableOpacity
                            style={styles.buttonContainer}
                            onPress={() => {
                                setIsClickedSubmit(true);
                                handleSubmit();
                                // resetForm();
                            }}>
                            <Text style={styles.buttonText}>Kaydet</Text>
                        </TouchableOpacity>
                    </>
                )}
            </Formik>
        </SafeAreaView>
    );
};

export default HomeScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: "100%",
        alignItems: "center",
        justifyContent: "flex-start",
        padding: 10,
    },
    imageContainer: {
        marginTop: 20,
        width: "90%",
        alignItems: "center",
        alignSelf: "center",
    },
    buttonContainer: {
        marginVertical: 10,
        paddingVertical: 10,
        alignSelf: "center",
        alignContent: "center",
        borderRadius: 12,
        width: "100%",
        backgroundColor: "#142143",
    },
    buttonText: {
        color: "white",
        alignSelf: "center",
        alignContent: "center",
        fontSize: 16,
        fontWeight: "600",
    },
});
