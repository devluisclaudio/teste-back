import {User} from '../../interfaces'
import {UserOuput} from '../../../db/models/User'

export const toUser = (user: UserOuput): User => {
    return {
        id: user.id,
        name: user.name,
        email: user.email,
        password: user.password,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
        deletedAt: user.deletedAt,
    }
}