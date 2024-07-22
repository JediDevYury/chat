import {Params} from "nestjs-pino";
import * as process from "process";

export const loggerConfig: Params = {
  pinoHttp: {
    transport: process.env.NODE_ENV !== 'production'
     ? { target: 'pino-pretty' }
     : undefined,
  },
}
