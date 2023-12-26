import httpStatus from 'http-status';
import User from '../models/user';
import ApiError from '../utils/error/ApiError';
import { NewCreatedUser, IUserDoc, UpdateUserBody } from '../interfaces/user';

const set = <T>(model: T, entity: T): T => {
      Object.assign(entity, model);
      return entity;
};
/**
 * Create a user
 * @param {NewCreatedUser} userBody
 * @returns {Promise<IUserDoc>}
 */
export const createUser = async (
      userBody: NewCreatedUser,
): Promise<IUserDoc> => {
      if (await User.isEmailTaken(userBody.email)) {
            throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
      }
      return await User.create(userBody);
};
/**
 *
 * @param id
 * @param model
 * @returns
 */
export const updateUser = async (
      id: string,
      model: UpdateUserBody,
): Promise<IUserDoc> => {
      const entity: IUserDoc | null = await User.findById(id);

      if (entity) {
            set(model, entity);
            await entity.save();
      }
      return entity;
};

export const getById = async (id: string): Promise<IUserDoc | null> => {
      return await User.findById(id);
};

export const getByCondition = async (condition: {
      email?: string;
}): Promise<IUserDoc | null> => {
      return await User.findOne(condition);
};

export const get = async (
      query: string | { id?: string; email?: string },
): Promise<IUserDoc | null> => {
      if (typeof query === 'string') {
            return getById(query as string);
      }

      if (query.id) {
            return getById((query as { id?: string }).id);
      }

      if (query.email) {
            return getByCondition({
                  email: (query as { email?: string }).email,
            });
      }

      return null;
};
interface SearchResults {
      count: number;
      items: IUserDoc[];
}

interface PageOptions {
      skip: number | 0;
      limit: number | 10;
      sort: { createdAt: -1 };
}
export const search = async (
      query: any,
      user: IUserDoc,
      page: PageOptions,
): Promise<SearchResults> => {
      let where = {
            _id: { $ne: user && user.id },
      };

      const count: number = await User.countDocuments(where);

      let items: IUserDoc[];
      if (page) {
            items = await User.find(where)
                  .sort(page.sort)
                  .skip(page.skip)
                  .limit(page.limit);
      } else {
            items = await User.find(where).sort({ createdAt: -1 });
      }

      return {
            count,
            items,
      };
};
