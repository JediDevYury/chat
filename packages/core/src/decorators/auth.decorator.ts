import { SetMetadata } from '@nestjs/common'
export enum AuthType {
  Bearer,
  None,
}

export const Auth = (type: AuthType = AuthType.Bearer) => SetMetadata('auth', type)
