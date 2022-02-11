import axios, {AxiosResponse} from 'axios';
import {IUser} from '../models/IUser';

export default class UsersService {
  static async getUsers(): Promise<AxiosResponse<IUser[]>> {
    return await axios.get<IUser[]>('./users.json');
  }
}