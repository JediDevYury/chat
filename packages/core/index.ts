import {NestFactory} from '@nestjs/core';
import {AppModule} from './src/modules';
import {Logger, PinoLogger} from "nestjs-pino";
import {ValidationPipe} from "@nestjs/common";
import {AuthErrorFilter} from "./src/filters";

async function bootstrap() {
    const app = await NestFactory.create(AppModule, {bufferLogs: true});

    app.useGlobalFilters(new AuthErrorFilter());
    app.useLogger(app.get(Logger));
    app.useGlobalPipes(new ValidationPipe());
    app.enableCors();

    await app.listen(3000);
}

bootstrap().catch(err => {
    console.error(err);
    (new PinoLogger({})).error('bootstrap() failed', err)
});
