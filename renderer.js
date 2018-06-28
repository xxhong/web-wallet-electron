// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

const storage = nodeRequire('electron-json-storage');
const dataPath = storage.getDataPath();
console.log("目录："+dataPath);
function setFileJson(fileJson) {
    storage.set('filejson', fileJson, function (error) {
        if (error) throw error;
    });
}

function setAccount(accountFileName) {
    storage.set('account', {account: accountFileName}, function (error) {
        if (error) throw error;
    });
}

function setPassword(password) {
    storage.set('password', {password: password}, function (error) {
        if (error) throw error;
    });
}

function getAllData(callback) {
    storage.getMany(['filejson', 'account', 'password'], function (error, data) {
        if (error) throw error;
        callback(data.filejson, data.account.account, data.password.password)
    });
}

