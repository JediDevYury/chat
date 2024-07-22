/* @ts-ignore */
import {Injectable} from '@nestjs/common';
import {Logger} from 'nestjs-pino';
import * as util from 'util';
import {exec} from 'child_process';

const execPromise = util.promisify(exec);

@Injectable()
export class MigrationService {
  constructor(
   private readonly logger: Logger,
  ) {}

  async runMigrations() {
    try {
      await execPromise('npx prisma migrate deploy');
      this.logger.log('Migrations deployed');
    } catch (e) {
      this.logger.error('Error deploying migrations', e);
    }
  }
}
