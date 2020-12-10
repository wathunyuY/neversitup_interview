import { User } from './../entities/user.entity';
import { EntitySchema } from 'typeorm';

export const UserSchema = new EntitySchema<User>({
    name: 'User',
    target: User,
    columns: {
        id: {
            type: Number,
            primary: true,
            generated: true,
        },
        username: {
            type: String,
        },
        password: {
            type: String,
        },
        firstName: {
            type: String,
        },
        lastName: {
            type: String,
        },
        isActive: {
            type: Boolean,
            default: true,
        },
    },
    relations: {
        recipts: {
            type: 'one-to-many',
            target: 'Receipt', // the name of the Schema
        },
    },
});