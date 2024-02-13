import { Request, Response } from 'express';
import User from '../models/User';
import { HttpError } from '../helpers';
import { ctrlWrapper } from '../decorators/index';

const userInfo = async (req: Request, res: Response) => {
    const { _id, name, avatarURL, email, favorite } = req.body.user;
    res.status(201).json({
        status: 'OK',
        code: 201,
        data: { user: { _id, name, avatarURL, email, favorite } },
    });
};

const updateInfo = async (req: Request, res: Response) => {
    const { _id } = req.body.user;
    const { name } = req.body;

    await User.findByIdAndUpdate(_id, { name }, { new: true });

    res.status(201).json({
        status: 'OK',
        code: 201,
        data: { name },
    });
};

const favorite = async (req: Request, res: Response) => {
    const user = req.body.user;
    const favoriteID = req.body.favorite;

    const index = user.favorite.indexOf(favoriteID);
    if (index === -1) {
        await User.findByIdAndUpdate(user.id, {
            $push: { favorite: favoriteID },
        });
        res.status(201).json({
            status: 'OK',
            code: 201,
            message: 'user favorite succsessfuly added',
        });
    } else {
        await User.findByIdAndUpdate(
            user.id,
            { $pull: { favorite: favoriteID } },
            { new: true }
        );
        res.status(204).json({});
    }
    return;
};

export const userController = {
    favorite: ctrlWrapper(favorite),
    userInfo: ctrlWrapper(userInfo),
    updateInfo: ctrlWrapper(updateInfo),
};
