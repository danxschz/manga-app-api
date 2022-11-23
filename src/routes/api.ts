import { Router } from 'express';

import { adminMw, validate } from './middleware';
import User from '@models/user-model';
import authRoutes from './auth-routes';
import userRoutes from './user-routes';


// **** Init **** //

const router = Router();


// **** Setup auth routes **** //

const authRouter = Router();

// Login user
authRouter.post(
  authRoutes.paths.login,
  validate('email', 'password'),
  authRoutes.login,
);

// Logout user
authRouter.get(authRoutes.paths.logout, authRoutes.logout);

// Add authRouter
router.use(authRoutes.paths.basePath, authRouter);


// **** Export default **** //

export default router;
