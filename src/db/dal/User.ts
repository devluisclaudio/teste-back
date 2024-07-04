import { User } from '../models'
import { UserInput, UserOuput } from '../models/User'

export const create = async (payload: UserInput): Promise<UserOuput> => {
    const user = await User.create(payload)
    return user
}

export const update = async (id: number, payload: Partial<UserInput>): Promise<UserOuput> => {
    const user = await User.findByPk(id)
    if (!user) {
        throw new Error('not found')
    }
    const updatedUser = await (user as User).update(payload)
    return updatedUser
}

export const getById = async (id: number): Promise<UserOuput> => {
    const user = await User.findByPk(id)
    if (!user) {
        throw new Error('not found')
    }
    return user
}

export const deleteById = async (id: number): Promise<boolean> => {
    const deletedUserCount = await User.destroy({
        where: { id }
    })
    return !!deletedUserCount
}

export const getAll = async (): Promise<UserOuput[]> => {
    return User.findAll({})
}

export const findByEmail = async (email: string): Promise<UserOuput> => {
    const user = await User.findOne({where: {email}})
    if (!user) {
        throw new Error('not found Email')
    }
    return user
}