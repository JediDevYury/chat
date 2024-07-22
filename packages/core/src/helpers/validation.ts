export const extractTokenFromHeader = (request: Request): string | undefined => {
  const [,token] = request.headers["authorization"]?.split(' ') ?? [];
  return token;
}
