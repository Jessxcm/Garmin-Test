import {Application} from "express"
import express from "express"
import routerConst from "./routes";


const appConst : Application = express();
export default appConst;

appConst.set("port",3000);

appConst.use(express.json());

appConst.use("",routerConst);


