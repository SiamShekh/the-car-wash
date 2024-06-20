import mongoose from "mongoose";
import app from "./app"
import _ENV from "./config/config"

async function main() {
    await mongoose.connect('mongodb+srv://Siam4201:Asik1234*@cluster0.yb7xjgu.mongodb.net/the-car-wash');

    app.listen(_ENV.port, () => {
        console.log(`Example app listening on port ${_ENV.port}`)
    })
}

main();