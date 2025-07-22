import {z} from 'zod/v4';

export const id = z.uuid({ message: 'Invalid UUID format' });

export const phone = z.string().length(10, 'Phone number must be exactly 10 digits').regex(/^\d{10}$/, 'Phone number must contain only digits');
export const aadhaar = z.string().length(12, 'Aadhaar number must be exactly 12 digits').regex(/^\d{12}$/, 'Aadhaar number must contain only digits');

export const name = (name:string) =>{
    return z.string().min(3, `${name} is required`).max(35, `${name} must be less than 35 characters`);
}

export const email = z.email({message: 'Invalid email address'});


export const emailObject = z.object({
    email: email,
})
    