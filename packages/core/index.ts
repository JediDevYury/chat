import {NestFactory} from '@nestjs/core';
import {AppModule} from './src/modules';
import {Logger, PinoLogger} from "nestjs-pino";
import {ValidationPipe} from "@nestjs/common";
import {CommonExceptionFilter} from "./src/filters";

async function bootstrap() {
    const app = await NestFactory.create(AppModule, {bufferLogs: true});

    app.useGlobalFilters(new CommonExceptionFilter());
    app.useLogger(app.get(Logger));
    app.useGlobalPipes(new ValidationPipe());

    if(process.env.NODE_ENV !== 'production') {
        app.enableCors();
    }

    await app.listen(3000);
}

bootstrap().catch(err => {
    (new PinoLogger({})).error('bootstrap() failed', err)
});
