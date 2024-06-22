import {NestFactory} from '@nestjs/core';
import {AppModule} from './modules';
import {Logger, PinoLogger} from "nestjs-pino";

async function bootstrap() {
    const app = await NestFactory.create(AppModule, {bufferLogs: true});
    app.useLogger(app.get(Logger));
    await app.listen(3000);
}

bootstrap().catch(err => {
    (new PinoLogger({})).error('bootstrap() failed', err)
});
