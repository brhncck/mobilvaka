import AsyncStorage from "@react-native-async-storage/async-storage";

export const getData = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem("userinfo");
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (error) {
    console.log({ error });
  }
};

export const removeValue = async () => {
  try {
    await AsyncStorage.removeItem("userinfo");
  } catch (error) {
    console.log({ error });
  }

  console.log("Done.");
};

export const storeData = async (value) => {
  try {
    let response = await getData();
    if (response != null) {
      response.push(value);
      await AsyncStorage.setItem("userinfo", JSON.stringify(response));
    } else {
      await AsyncStorage.setItem("userinfo", JSON.stringify([value]));
    }
  } catch (error) {
    console.log({ error });
  }
};
