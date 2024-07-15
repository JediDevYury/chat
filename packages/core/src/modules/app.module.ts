import { Module } from '@nestjs/common';
import { LoggerModule } from "nestjs-pino";
import { AppService } from '../services';
import { TypeOrmModule } from "@nestjs/typeorm";
import {ConfigModule, ConfigService} from "@nestjs/config";
import {apolloDriverConfig, loggerConfig} from "../configs";
import typeorm from '../configs/typeorm.config';
import {GraphQLModule} from "@nestjs/graphql";
import {ApolloDriverConfig} from "@nestjs/apollo";
import {UsersModule} from "./users.module";
import {IamModule} from "./iam.module";
import {env} from "../configs/env";

@Module({
  imports: [
    UsersModule,
    IamModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      load: [typeorm, env],
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => configService.get('typeorm'),
    }),
    LoggerModule.forRoot(loggerConfig),
    GraphQLModule.forRoot<ApolloDriverConfig>(apolloDriverConfig),
  ],
  providers: [
    AppService
  ],
})
export class AppModule {}
