"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDB = void 0;
const mongoose_1 = require("mongoose");
function connectDB() {
    return __awaiter(this, void 0, void 0, function* () {
        // cadena de conexion
        const url2 = 'mongodb+srv://testuser:1234@garmininfo.gzbfee3.mongodb.net/GarminInfo?retryWrites=true&w=majority';
        // conectar a mongoDB
        yield (0, mongoose_1.connect)(url2);
        console.log("conectado a la BD");
    });
}
exports.connectDB = connectDB;
