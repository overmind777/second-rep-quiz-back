"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userController = void 0;
const User_1 = __importDefault(require("../models/User"));
const index_1 = require("../decorators/index");
const userInfo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { _id, name, email, favorite } = req.body.user;
    res.status(201).json({ user: { _id, name, email, favorite } });
});
const updateInfo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { _id } = req.body.user;
    const { name } = req.body;
    console.log();
    const result = yield User_1.default.findByIdAndUpdate(_id, { name }, { new: true });
    res.status(201).json({ result: name });
});
const favorite = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.body.user;
    const favoriteID = req.body.favorite;
    if (!user.favorite.includes(favoriteID)) {
        yield User_1.default.findByIdAndUpdate(user.id, { $push: { favorite: favoriteID } }, { new: true });
        res.status(201).json({ message: 'user favorite succsessfuly added' });
        return;
    }
    if (user.favorite.includes(favoriteID)) {
        yield User_1.default.findByIdAndUpdate(user.id, { $pull: { favorite: { id: favoriteID } } }, { new: true });
        res.status(204).json({});
        return;
    }
});
exports.userController = {
    favorite: (0, index_1.ctrlWrapper)(favorite),
    userInfo: (0, index_1.ctrlWrapper)(userInfo),
    updateInfo: (0, index_1.ctrlWrapper)(updateInfo)
};