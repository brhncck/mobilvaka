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

import React, { useEffect, useState } from "react";
import * as ImagePicker from "expo-image-picker";
import { getData, storeData } from "../storage";
import * as DocumentPicker from 'expo-document-picker';
import { Formik } from "formik";
import UserForm from "../components/Form"

const HomeScreen = () => {
  const defaultImageSource = require("../../assets/profile.png");

  const [imageSource, setImageSource] = useState();
  const [countries, setCountries] = useState([]);
  const [cities, setCities] = useState([]);
  const [isReadKvkk, setIsReadKvkk] = useState(false);
  const [isCheckedKvkk, setIsCheckedKvkk] = useState(false);
  const [userInfos, setUserInfos] = useState({
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
  });

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

  useEffect(() => {
    fetch(
      "https://countriesnow.space/api/v0.1/countries/info?returns=iso2,name"
    )
      .then((response) => response.json())
      .then((json) => setCountries(json.data))
      .catch((e) => console.log("error", e));
  }, []);

  useEffect(() => {
    var raw = JSON.stringify({
      iso2: userInfos.country,
    });

    var requestOptions = {
      method: "POST",
      body: raw,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    };

    fetch(
      "https://countriesnow.space/api/v0.1/countries/cities",
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => setCities(result.data))
      .catch((error) => console.log("error", error));
  }, [userInfos.country]);

  const selectPdfFile = async () => {
    let result = await DocumentPicker.getDocumentAsync({ type: ["application/pdf"] });
    console.log(result.assets[0].name);
    setUserInfos((prev) => ({ ...prev, cvPath: result.assets[0].name }))
  };

  const saveUserInfo = async () => {
    const response = await getData();

    if (!isCheckedKvkk) {
      Alert.alert('Uyarı', 'Lütfen KVKK metnini okuyup onaylayınız.', [
        { text: 'Tamam', onPress: () => console.log('OK Pressed') },
      ]);
      return;
    }

    if (response != null && response.findIndex(
      (item) => item.userId == userInfos.userId
    ) != -1) {
      Alert.alert('Uyarı', 'Bu Kimlik Numarası kullanılmaktadır.', [
        { text: 'Tamam', onPress: () => console.log('OK Pressed') },
      ]);
      console.log("save result : ", response.findIndex(
        (item) => item.userId == userInfos.userId
      ));
      return;
    }

    await storeData(userInfos);
    clearForm();
    Alert.alert('Başırılı', 'Kayıt başarıyla oluşturuldu.', [
      { text: 'Tamam', onPress: () => console.log('OK Pressed') },
    ]);
    console.log("save result : ", response.findIndex(
      (item) => item.userId == userInfos.userId
    ));
  };

  const clearForm = () => {
    setCities([]);
    setIsReadKvkk(false);
    setIsCheckedKvkk(false);
    setUserInfos({
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
    });
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View
        style={{
          flex: 1,
          width: "100%",
          alignItems: "center",
          justifyContent: "flex-start",
          padding: 10,
        }}
      >
        <TouchableOpacity
          style={{
            marginTop: 20,
            width: "90%",
            alignItems: "center",
            alignSelf: "center",
          }}
          onPress={() => {
            imagePicker();
          }}
        >
          <Image
            resizeMode="contain"
            style={{ height: 160, width: "100%", }}
            source={
              imageSource == null ? defaultImageSource : { uri: imageSource }
            }
          />
        </TouchableOpacity>

        <Formik

          initialValues={userInfos}
          onSubmit={values => console.log(values)}
        >
          {({ handleChange, handleBlur, handleSubmit, values }) => (
            <>
              <ScrollView style={{ width: "100%" }}>
                <UserForm handleChange={handleChange} userInfos={values} setUserInfos={setUserInfos} countries={countries} cities={cities} isReadKvkk={isReadKvkk} setIsReadKvkk={setIsReadKvkk} isCheckedKvkk={isCheckedKvkk} setIsCheckedKvkk={setIsCheckedKvkk} selectPdfFile={selectPdfFile} selectedPdf={userInfos.cvPath} />
              </ScrollView>
              <TouchableOpacity
                style={{
                  marginVertical: 10, paddingVertical: 10,
                  alignSelf: "center",
                  alignContent: "center", borderRadius: 12, width: "100%", backgroundColor: "#142143"
                }}
                onPress={() => {
                  handleSubmit();
                  // saveUserInfo();
                }
                }
              >
                <Text style={{
                  color: "white",
                  alignSelf: "center",
                  alignContent: "center",
                  fontSize: 16,
                  fontWeight: 600,
                }}>Kaydet</Text>
              </TouchableOpacity>
            </>
          )}
        </Formik>
      </View>
    </SafeAreaView >
  );
};



export default HomeScreen;


