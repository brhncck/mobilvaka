const BASE_URL = "https://countriesnow.space/api/v0.1/";

export const getCountryNames = async () => {
    const response = await fetch(`${BASE_URL}countries/info?returns=iso2,name`)
        .then((response) => response.json())
        .then((json) => json.data)
        .catch((e) => console.log("error", e));
    response?.unshift({ "name": "Seçiniz" })
    return response;
};

export const getCities = async ({ country }) => {
    const headers = {
        Accept: "application/json",
        "Content-Type": "application/json",
    };
    const body = JSON.stringify({ country });

    const options = {
        method: "POST",
        headers,
        body,
    };

    const response = await fetch(`${BASE_URL}countries/cities`, options)
        .then((response) => response.json())
        .then((json) => json.data)
        .catch((e) => console.log("error", e));
    response?.unshift("Seçiniz");
    return response;
};
