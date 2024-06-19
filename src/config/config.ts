import { config } from "dotenv";
import path from "path";

config({ path: path.join(process.cwd(), ".env") });

const _ENV = {
    port: process.env.PORT,
    salt: process.env.SALT,
    secrect: process.env.SECRECT,
}

export default _ENV;