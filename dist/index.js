import app from "./app.js";
import { connectDataBase } from "./db/connection.js";
//connections and listeners
connectDataBase()
    .then(() => {
    app.listen(process.env.PORT || 5000, () => console.log("Server Open and Connected! 😎"));
})
    .catch((error) => console.log(error));
//# sourceMappingURL=index.js.map