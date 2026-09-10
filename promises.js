function getUser(){
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const user = { id: 1, name: "John Doe" };
            resolve(user);
        }, 1000);
    });
}
function getUserPosts(userId){
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const posts = [
                { id: 1, title: "Post 1", userId: userId },
                { id: 2, title: "Post 2", userId: userId },
            ];
            resolve(posts);
        }, 1000);
    });
}
function getPostComments(postId){
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const comments = [
                { id: 1, text: "Comment 1", postId: postId },
                { id: 2, text: "Comment 2", postId: postId },
            ];
            resolve(comments);
        }, 1000);
    });
}

getUser()
    .then((user) => {
        console.log("User:", user);
        return getUserPosts(user.id);
    }   )
    .then((posts) => {
        console.log("Posts:", posts);
        return getPostComments(posts[0].id);
    })
    .then((comments) => {
        console.log("Comments:", comments);
    })
    .catch((error) => {
        console.error("Error:", error);
    });