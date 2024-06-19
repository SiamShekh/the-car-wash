export interface TUser {
    name: String,
    email: String,
    password: String,
    phone: String,
    role: "admin" | "user",
    address: String,
};

export interface TUserLogin {
    email: String,
    password: String,
}