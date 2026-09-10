function getuser(callBack) {

    setTimeout(() => {
        console.log("Login successful");

        callBack();
    }, 1000);
}
function homepage(callBack) {

    setTimeout(() => {
        console.log("Homepage loaded");

        callBack();
    }, 1000);
}
function upload(callBack) {

    setTimeout(() => {
        console.log("Upload images and videos");

        callBack();
    }, 1000);
}
function logout(callBack) {

    setTimeout(() => {
        console.log("Logout successful");
        callBack();
    }, 1000);
}
//CallBack hell
getuser(
    () => {
        homepage(
            () => {
                upload(
                    () => {
                        logout(() => {
                            console.log("you can now close the browser");
                        })
                    })
            })
    })