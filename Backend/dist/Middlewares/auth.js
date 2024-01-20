"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Authentication = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_1 = require("../Routes/user");
function Authentication(req, res, next) {
    let authHead = req.headers.auth;
    if (authHead) {
        const token = authHead.split(' ')[1];
        jsonwebtoken_1.default.verify(token, user_1.SECRET, (err, user) => {
            if (err) {
                return res.sendStatus(403);
            }
            req.user = user;
            next();
        });
    }
    else {
        res.sendStatus(401);
    }
}
exports.Authentication = Authentication;
