import { Router } from 'express';
const router = Router()

import * as usersCtrl from '../controllers/user.controller'
import { authJwt, verifySignup } from '../middlewares'

router.get('/', [authJwt.verifyToken], usersCtrl.getUsers)

router.post('/', [authJwt.verifyToken, authJwt.isAdmin, verifySignup.checkRolesExisted], usersCtrl.createUser)

router.get('/:userId', [authJwt.verifyToken], usersCtrl.getUserById)

router.put('/:userId', [authJwt.verifyToken], usersCtrl.updateUserById)

export default router