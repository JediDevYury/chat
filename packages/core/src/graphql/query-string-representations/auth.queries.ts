const AUTHENTICATE = `mutation authenticate($googleTokenInput: GoogleTokenInput!) {
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

export { AUTHENTICATE, REFRESH_TOKENS }
