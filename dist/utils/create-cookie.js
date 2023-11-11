import { COOKIE_NAME } from "../constants/common.js";
import { createToken } from "./token-manager.js";
export const createCookie = (res, user) => {
    res.clearCookie(COOKIE_NAME, {
        path: "/",
        domain: "localhost",
        httpOnly: true,
        signed: true,
    });
    const token = createToken(user._id.toString(), user.email, "7d");
    const expires = new Date();
    expires.setDate(expires.getDate() + 7);
    res.cookie(COOKIE_NAME, token, {
        path: "/",
        domain: "localhost",
        expires,
        httpOnly: true,
        signed: true,
    });
};
//# sourceMappingURL=create-cookie.js.map