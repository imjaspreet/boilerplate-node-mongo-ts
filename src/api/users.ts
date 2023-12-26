import httpStatus from 'http-status';
import * as userService from '../services/users';
import { Request, Response } from 'express';
import { extract } from '../utils/paging';
export const create = async (req: Request, res: Response) => {
      const user = await userService.createUser(req.body);
      res.status(httpStatus.CREATED).send(user);
};

export const update = async (req: Request, res: Response) => {
      const user = await userService.updateUser(req.params.id, req.body);
      res.status(httpStatus.OK).send(user);
};

export const get = async (req: Request, res: Response) => {
      const user = await userService.updateUser(req.params.id, req.body);
      res.status(httpStatus.OK).send(user);
};

export const remove = async (req: Request, res: Response) => {
      const user = await userService.updateUser(req.params.id, req.body);
      res.status(httpStatus.OK).send(user);
};

export const search = async (req: Request, res: Response) => {
      const page: any = extract(req.query as any);
      const user = await userService.search(req.query, page, page);
      res.status(httpStatus.OK).json({
            items: user.items,
            totalRecord: user.count,
      });
};
