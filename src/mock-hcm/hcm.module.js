import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { HcmController } from './hcm.controller.js';
import { HcmService } from './hcm.service.js';
import { BalanceEntity } from '../balance/balance.entity.js';


@Module({
  imports: [TypeOrmModule.forFeature([BalanceEntity])],
  controllers: [HcmController],
  providers: [HcmService],
})
export class HcmModule { }