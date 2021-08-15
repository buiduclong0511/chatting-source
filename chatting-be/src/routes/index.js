const conversationRouter = require("./conversation");
const userRouter = require("./user");
const messageRouter = require("./message");
const authRouter = require("./auth");

function route(app) {
    app.use("/api/conversations", conversationRouter);
    app.use("/api/users", userRouter);
    app.use("/api/messages", messageRouter);
    app.use("/api/auth", authRouter);
}

module.exports = route;
