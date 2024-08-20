import { Router } from "express";
import { createWorkout, getActivityDetails, getWorkout, webhook } from './controller';

const routerConst: Router = Router();

export default routerConst;

routerConst.route('/activity-details').get(getActivityDetails);
routerConst.route('/get-workout').get(getWorkout);
routerConst.route('/workout').post(createWorkout);
routerConst.route('/webhook').post(webhook)
