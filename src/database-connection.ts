import {connect, connection} from "mongoose";

export async function connectDB() {
    // cadena de conexion
    const url2= 'mongodb+srv://testuser:1234@garmininfo.gzbfee3.mongodb.net/GarminInfo?retryWrites=true&w=majority';
    // conectar a mongoDB

    await connect(url2);

    console.log("conectado a la BD");
}
