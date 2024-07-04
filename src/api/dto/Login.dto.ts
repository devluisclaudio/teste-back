import { Optional } from "sequelize/types"

export type LoginUserDTO = {
    email: string;
    password: string;
}

export type UpdateUserDTO = Optional<LoginUserDTO, 'email'>