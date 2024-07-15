export const env = () => ({
  jwt: {
    secret: process.env.JWT_SECRET ?? 'secret',
    audience: process.env.JWT_AUDIENCE ?? 'audience',
    issuer: process.env.JWT_ISSUER ?? 'issuer',
    accessTokenTtl: parseInt(process.env.JWT_ACCESS_TOKEN_TTL ?? '3600', 10),
    refreshTokenTtl: parseInt(process.env.JWT_REFRESH_TOKEN_TTL ?? '86400', 10)
  },
  nodeEnv: process.env.NODE_ENV ?? 'development',
  google: {
    androidClientId: process.env.GOOGLE_ANDROID_CLIENT_ID ?? 'android-client-id',
    iosClientId: process.env.GOOGLE_IOS_CLIENT_ID ?? 'ios-client-id',
  },
})
