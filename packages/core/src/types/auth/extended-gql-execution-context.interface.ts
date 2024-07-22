import {GqlExecutionContext} from "@nestjs/graphql";
import {Response, Request} from "express";

export type ExtendedGqlExecutionContext = GqlExecutionContext & {
  res: Response
  req: Request
}
