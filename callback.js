function login(callBack) {

    setTimeout(() => {
        console.log("Login successful");

        callBack();
    }, 1000);
}

function orderFood(callBack) {

    setTimeout(() => {
        console.log("Food ordered");
        callBack();
    }, 1000);
}

function addToCart(callBack) {

    setTimeout(() => {
        console.log("Food added to cart");
        callBack();
    }, 1000);
}

function payment(callBack) {
    setTimeout(() => {
        console.log("Payment processed");
        callBack();
    }, 1000);
}
//callback hell
login(
    () => {
        orderFood(
            () => {
                addToCart(
                    () => {
                        payment(() => {
                            console.log("All steps completed successfully");
                        })
                    })
            })
    })