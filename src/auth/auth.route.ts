
import express, { Router } from 'express';
import { authController } from './auth.controller';
const router:Router = express.Router()
const user = authController.prototype

router.route("/signup").post(user.signup)
router.route("/signin").post(user.signin)
router.route("/forgot").post(user.forgotPassword)
router.route("/change").post(user.changePassword)
router.route("/reresh").post(user.refreshToken)
router.route("/logout").post(user.logout)