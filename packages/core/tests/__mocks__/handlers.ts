import { http, HttpResponse } from 'msw'

export const handlers = [
  http.get("https://www.googleapis.com/oauth2/v1/certs", () => {
    return HttpResponse.json({ accessToken: 'accessToken', refreshToken: 'refreshToken' })
  })
]
