const AUTHENTICATE = `mutation authenticate($googleTokenInput: TokenInput!) {
  authenticate(googleTokenInput: $googleTokenInput) {
    email
  }
}`

const REFRESH_TOKENS = `mutation refreshTokens($refreshTokenInput: RefreshTokenInput!) {
  refreshTokens(refreshTokenInput: $refreshTokenInput) {
    accessToken
    refreshToken
  }
}`

export default { AUTHENTICATE, REFRESH_TOKENS }
