import * as z from 'zod'

export const loginSchema= z.object({
        email:z.string().email('Email is required.'),
        password:z.string().regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,"Password must include uppercase, lowercase, number, and special character.").nonempty("Password is required."),
       

    })