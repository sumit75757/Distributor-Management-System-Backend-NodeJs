import express from 'express';
import { runAsyncWrapper } from '../helpers/helper';
import * as UserController from '../controller/userInfo.controller';

let router = express.Router();

router.get("/getusers", runAsyncWrapper(UserController.getUsers));
router.post("/signUp", runAsyncWrapper(UserController.signUp));
router.post("/login", runAsyncWrapper(UserController.login));
router.get("/getUsersById", runAsyncWrapper(UserController.getUsersById));
router.post("/assignRole", runAsyncWrapper(UserController.changeRole));
router.post("/forgot", runAsyncWrapper(UserController.forgot));



router.post("/me", runAsyncWrapper(UserController.loginUserDetails));

export default router;