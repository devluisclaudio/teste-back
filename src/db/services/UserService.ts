import { LoginUserDTO } from 'src/api/dto/Login.dto'
import * as userDal from '../dal/User'
import {UserInput, UserOuput} from '../models/User'

export const create = (payload: UserInput): Promise<UserOuput> => {
    return userDal.create(payload)
}
export const update = (id: number, payload: Partial<UserInput>): Promise<UserOuput> => {
    return userDal.update(id, payload)
}
export const getById = (id: number): Promise<UserOuput> => {
    return userDal.getById(id)
}
export const deleteById = (id: number): Promise<boolean> => {
    return userDal.deleteById(id)
}
export const getAll = (): Promise<UserOuput[]> => {
    return userDal.getAll()
}
export const getByEmail = ({email}: LoginUserDTO): Promise<UserOuput> => {
    return userDal.findByEmail(email)
}