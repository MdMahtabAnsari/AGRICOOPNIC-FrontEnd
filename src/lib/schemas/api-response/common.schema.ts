import {z} from "zod/v4";

export const createdAt = z.date({error: 'Invalid date format for createdAt'});
export const updatedAt = z.date({error: 'Invalid date format for updatedAt'});