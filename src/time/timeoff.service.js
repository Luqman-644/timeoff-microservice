const { InjectRepository } = require('@nestjs/typeorm');
const { TimeoffEntity } = require('./timeoff.entity');
import { BalanceService } from '../balance/balance.service';
import { Inject } from '@nestjs/common';


class TimeoffService {
    constructor(timeoffRepo, balanceService) {
        this.timeoffRepo = timeoffRepo;
        this.balanceService = balanceService;
    }

    async createRequest(employeeId, locationId, days) {
        const result = await this.balanceService.deductBalance(
            Number(employeeId),
            locationId,
            Number(days)
        );

        if (!result.success) {
            return {
                status: "REJECTED",
                message: result.message
            };
        }

        const request = await this.timeoffRepo.save({
            employeeId,
            locationId,
            days,
            status: "APPROVED"
        });

        return request;
    }

    async getRequests() {
        return this.timeoffRepo.find();
    }
}

InjectRepository(TimeoffEntity)(TimeoffService, undefined, 0);
Inject(BalanceService)(TimeoffService, undefined, 1);
module.exports = { TimeoffService };