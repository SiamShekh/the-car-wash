import mongoose from "mongoose";
import app from "./app"
import _ENV from "./config/config"

async function main() {
    await mongoose.connect('mongodb://localhost:27017/assignment-3');

    app.listen(_ENV.port, () => {
        console.log(`Example app listening on port ${_ENV.port}`)
    })
}

main();