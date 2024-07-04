import * as service from '../../../db/services/UserService'
import {CreateUserDTO, UpdateUserDTO} from '../../dto/User.dto'
import {User} from '../../interfaces'
import * as mapper from './mapper'


export const create = async(payload: CreateUserDTO): Promise<User> => {
    return mapper.toUser(await service.create(payload))
}
export const update = async (id: number, payload: UpdateUserDTO): Promise<User> => {
    const result = await service.update(id, payload)
    return mapper.toUser(result)
}
export const getById = async (id: number): Promise<User> => {
    return mapper.toUser(await service.getById(id))
}
export const deleteById = async(id: number): Promise<Boolean> => {
    const isDeleted = await service.deleteById(id)
    return isDeleted
}
export const getAll = async(): Promise<User[]> => {
    return (await service.getAll()).map(mapper.toUser)
}