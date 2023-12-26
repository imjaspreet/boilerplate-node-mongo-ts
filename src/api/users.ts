import httpStatus from 'http-status';
import * as userService from '../services/users';
import { Request, Response } from 'express';

export const createUser = async (req: Request, res: Response) => {
    const user = await userService.createUser(req.body);
    res.status(httpStatus.CREATED).send(user);
};