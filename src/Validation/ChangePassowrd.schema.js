import * as z from 'zod'

export const ChangePasswordSchema= z.object({
    password:z.string().regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,"Current Password Is Required.").nonempty("incorrect password"),
    newPassword:z.string().regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,"New Password is required.").nonempty("Password must include uppercase, lowercase, number, and special character."),
        rePassword:z.string().nonempty("Please confirm your password."),

    }).refine((val)=>val.newPassword===val.rePassword,{
        message:'Passwords do not match.',
        path:['rePassword']
    })