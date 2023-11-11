import { connect, disconnect } from "mongoose";
async function connectDataBase() {
    try {
        await connect(process.env.MONGODB_URL);
    }
    catch (error) {
        console.log(error);
        throw new Error("Cannot Connect to MongoDB");
    }
}
async function disconnectDataBase() {
    try {
        await disconnect();
    }
    catch (error) {
        console.log(error);
        throw new Error("Cannot Disconnect to MongoDB");
    }
}
export { connectDataBase, disconnectDataBase };
//# sourceMappingURL=connection.js.map