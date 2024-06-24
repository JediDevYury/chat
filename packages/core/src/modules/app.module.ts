import { Module } from '@nestjs/common';
import { LoggerModule } from "nestjs-pino";
import { AppController } from '../controllers';
import { AppService } from '../services';

@Module({
  imports: [LoggerModule.forRoot({
      pinoHttp: {
              transport: process.env.NODE_ENV !== 'production'
                  ? { target: 'pino-pretty' }
                  : undefined,
          },
  })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
