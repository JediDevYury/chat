
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export class GoogleTokenInput {
    token: string;
}

export class RefreshTokenInput {
    refreshToken: string;
}

export class CreateUserInput {
    fullName?: Nullable<string>;
    email: string;
}

export class UpdateUserInput {
    fullName?: Nullable<string>;
    email?: Nullable<string>;
}

export class User {
    id: number;
    fullName?: Nullable<string>;
    email: string;
}

export class AuthTokens {
    accessToken: string;
    refreshToken: string;
}

export abstract class IQuery {
    users: User[];
    user?: User;
}

export abstract class IMutation {
    createUser?: User;
    updateUser?: User;
    deleteUser?: Nullable<User>;
    authenticate?: Nullable<User>;
    refreshTokens?: Nullable<AuthTokens>;
}

type Nullable<T> = T | null;
