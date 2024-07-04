import * as service from '../../../db/services/UserService'
import { LoginUserDTO } from '../../dto/Login.dto'
import { compareSync } from "bcryptjs";
import jwt, { Secret } from 'jsonwebtoken';
import { CreateUserDTO } from 'src/api/dto/User.dto';
import { UserOuput } from 'src/db/models/User';
const SECRET_KEY: Secret = process.env.JWT_SECRET || 'secret';

interface JWTResponse {
    token: string,
    user: UserOuput
}

export const login = async (payload: LoginUserDTO): Promise<JWTResponse> => {
    const user = await service.getByEmail(payload)
    const password_valid = compareSync(payload.password, user.password)
    if (!password_valid)
        throw new Error('Password is not correct')

    const token = jwt.sign({ id: user.id, name: user.name }, SECRET_KEY, {
        expiresIn: '2 days',
      });


    return {user , token}
}

export const register = async (payload: CreateUserDTO): Promise<JWTResponse> => {
    const user = await service.create(payload)
    const token = jwt.sign({ id: user.id, name: user.name }, SECRET_KEY, {
        expiresIn: '2 days',
      });
      
    return {user , token}
}

export const me = async (id: number): Promise<UserOuput> => {
    const user = await service.getById(id)
    return user
}
