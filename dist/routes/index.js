import { Router } from 'express';
import userRoutes from './user-routes.js';
import chatRoutes from './chat-routes.js';
const appRouter = Router();
appRouter.use("/user", userRoutes); //dominio/api/v1/users
appRouter.use("/chat", chatRoutes); //dominio/api/v1/chat
export default appRouter;
//# sourceMappingURL=index.js.map