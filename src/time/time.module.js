const { Module } = require('@nestjs/common');
const { TimeoffController } = require('./timeoff.controller');
const { TimeoffService } = require('./timeoff.service');
const { BalanceModule } = require('../balance/balance.module');
const { TimeoffEntity } = require('./timeoff.entity');
import { TypeOrmModule } from '@nestjs/typeorm';


class TimeoffModule { }

Module({
    imports: [TypeOrmModule.forFeature([TimeoffEntity]), BalanceModule],
    controllers: [TimeoffController],
    providers: [TimeoffService],
})(TimeoffModule);

module.exports = { TimeoffModule };