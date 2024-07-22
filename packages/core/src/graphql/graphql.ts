
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export class TokenInput {
    token: string;
}

export class RefreshTokenInput {
    refreshToken: string;
}

export class UpdateUserInput {
    fullName?: Nullable<string>;
    email?: Nullable<string>;
}

export class User {
    id: number;
    fullName: string;
    email: string;
    createdAt: GraphQLISODateTime;
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
    updateUser?: User;
    deleteUser?: Nullable<User>;
    authenticate?: Nullable<User>;
    refreshTokens?: Nullable<AuthTokens>;
}

export type GraphQLISODateTime = any;
type Nullable<T> = T | null;
