"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const routes_1 = __importDefault(require("./routes"));
const appConst = (0, express_1.default)();
exports.default = appConst;
appConst.set("port", 3000);
appConst.use(express_1.default.json());
appConst.use("", routes_1.default);
