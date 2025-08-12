function onloadFunc() {
    console.log("test");
    loadData();
    // postData("/name", { "name": "Test" })
    deleteData("/");
}

const BASE_URL = "https://remotestorage-8fad2-default-rtdb.europe-west1.firebasedatabase.app/";

async function loadData() {
    let response = await fetch(BASE_URL + ".json");
    let responseToJson = await response.json();
    console.log(responseToJson);
}

async function postData(path = "", data = {}) {
    let response = await fetch(BASE_URL + path + ".json", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
    return responseToJson = await response.json();
}

async function deleteData(path = "") {
    let response = await fetch(BASE_URL + path + ".json", {
        method: "DELETE"
    });
    return responseToJson = await response.json();
}