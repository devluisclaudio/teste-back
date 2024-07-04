import { Router, Request, Response } from 'express'
import * as authController from '../controllers/auth'
import { CreateUserDTO } from '../dto/User.dto'
import { LoginUserDTO } from '../dto/Login.dto'
import { CustomRequest, authMiddle } from '../middleware/auth'

const authRouter = Router()

authRouter.post('/login', async (req: Request, res: Response) => {
    try {
        const payload: LoginUserDTO = req.body
        const result = await authController.login(payload)
        return res.status(200).send(result)
    } catch (error) {
        let message = 'Unknown Error'
        if (error instanceof Error) message = error.message

        return res.status(500).send(message)
    }
})
authRouter.post('/register', async (req: Request, res: Response) => {
    try {
        const payload: CreateUserDTO = req.body
        const result = await authController.register(payload)
        return res.status(201).send(result)
    } catch (error) {
        let message = 'Unknown Error'
        if (error instanceof Error) message = error.message

        return res.status(500).send(message)
    }
})

authRouter.get('/me', authMiddle, async (req: Request, res: Response) => {
    try {
        const token: any = (req as CustomRequest).token
        const result = await authController.me(token.id)
        return res.status(200).send(result)
    } catch (error) {
        let message = 'Unknown Error'
        if (error instanceof Error) message = error.message

        return res.status(500).send(message)
    }
})
export default authRouter