import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BalanceModule } from './balance/balance.module'
import { TimeoffModule } from './time/time.module';
import { HcmModule } from './mock-hcm/hcm.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'timeoff.sqlite',
      autoLoadEntities: true,
      synchronize: true,
    }),
    BalanceModule, TimeoffModule, HcmModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
