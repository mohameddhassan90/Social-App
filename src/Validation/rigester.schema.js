import * as z from 'zod'

export const registerSchema= z.object({
        name:z.string().min(3,"min 3 char.").max(20,"max 20 char.").nonempty("Full name is required."),
        username:z.string().regex(/^[a-z0-9_]{3,30}$/,"username already exists").nonempty("this field is required"),
        email:z.string().email('invalid mail').nonempty("Email is required."),
        dateOfBirth:z.string().nonempty("Date of birth is required."),
        gender:z.enum(['female','male']),
        password:z.string().regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,"Password must include uppercase, lowercase, number, and special character.").nonempty("Password is required."),
        rePassword:z.string().nonempty("Please confirm your password."),

    }).refine((val)=>val.password===val.rePassword,{
        message:'Passwords do not match.',
        path:['rePassword']
    })

    