function loginWithCallback(callback) {
    setTimeout(() => {
        console.log("User logged in successfully");
        callback();
    }, 1000);
}

function uploadWithCallback(callback) {
    setTimeout(() => {
        console.log("User uploaded post successfully");
        callback();
    }, 1000);
}

loginWithCallback(() => {
    uploadWithCallback(() => {
        console.log("Callback work completed");
    });
});

function login() {
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log("User logged in successfully");
            resolve();
        }, 1000);
    });
}

function upload() {
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log("User uploaded successfully");
            resolve();
        }, 1000);
    });
}

async function runWithAsyncAwait() {
    try {
        await login();
        await upload();
        console.log("Async work completed");
    } catch (error) {
        console.log("Error while logging:", error.message);
    }
}

runWithAsyncAwait();