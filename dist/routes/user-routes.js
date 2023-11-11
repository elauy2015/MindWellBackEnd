import { Router } from "express";
import { getAllUsers, userSignUp, userLogin, verifyUser, userLogout } from "../controllers/user-controllers.js";
import { validate, signupValidators, loginValidator } from "../utils/validators.js";
import { verifyToken } from "../utils/token-manager.js";
const userRoutes = Router();
userRoutes.get('/', getAllUsers);
userRoutes.post('/signup', validate(signupValidators), userSignUp);
userRoutes.post('/login', validate(loginValidator), userLogin);
userRoutes.get('/auth-status', verifyToken, verifyUser);
userRoutes.get('/logout', verifyToken, userLogout);
export default userRoutes;
//# sourceMappingURL=user-routes.js.map