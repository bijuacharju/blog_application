const PATH = "./data.json";
const fs = require("fs");
class Post {
    get() {
        return this.readData();
    }

    getIndividualBlog(postID) {
        const posts = this.readData();
        const foundPost = posts.find((post) => post.id == postID);
        return foundPost;
    }

    add(newPost) {
        const currentPosts = this.readData();
        currentPosts.unshift(newPost);
        this.storeData(currentPosts);
    }

    readData() {
        let rawData = fs.readFileSync(PATH);
        let posts = JSON.parse(rawData);
        return posts;
    }

    storeData(rawData) {
        let data = JSON.stringify(rawData);
        fs.writeFileSync(PATH, data);
    }
}

module.exports = Post;
