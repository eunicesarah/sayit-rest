"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const routes_1 = require("./routes");
const middlewares_1 = require("./middlewares");
const app = (0, express_1.default)();
const port = 3000;
console.log(`port: ${port}`);
app.use((req, res, next) => {
    console.log(`Incoming request: ${req.method} ${req.ip} ${req.originalUrl}`);
    next();
});
app.use(middlewares_1.logger);
app.use('/psikolog', routes_1.psikologRouter);
app.use((req, res, next) => {
    res.send({ message: 'Hello world!' });
});
app.listen(port, () => {
    console.log(`Server started at http://localhost:${port}`);
});
