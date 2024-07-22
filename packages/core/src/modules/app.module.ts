import {Module} from '@nestjs/common';
import {LoggerModule} from "nestjs-pino";
import {AppService, PrismaService} from '../services';
import {ConfigModule} from "@nestjs/config";
import {apolloDriverConfig, env, loggerConfig} from "../configs";
import {GraphQLModule} from "@nestjs/graphql";
import {ApolloDriverConfig} from "@nestjs/apollo";
import {UsersModule} from "./users.module";
import {IamModule} from "./iam.module";
import {DateScalar} from "../graphql/scalars";

@Module({
  imports: [
    UsersModule,
    IamModule,
    LoggerModule.forRoot(loggerConfig),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      load: [env]
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>(apolloDriverConfig),
  ],
  providers: [
    AppService,
    PrismaService,
    DateScalar,
  ],
})

export class AppModule {}
