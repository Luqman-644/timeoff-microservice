import { InjectRepository } from '@nestjs/typeorm';
import { BalanceEntity } from './balance.entity.js';

export class BalanceService {
    constructor(balanceRepository) {
        this.balanceRepository = balanceRepository;
    }


    async getBalance(employeeId, locationId) {
        return this.balanceRepository.findOne({
            where: {
                employeeId: Number(employeeId),
                locationId: locationId,
            },
        });
    }
    async createBalance(data) {
        return this.balanceRepository.save({
            employeeId: Number(data.employeeId),
            locationId: data.locationId,
            employeeName: data.employeeName,
            days: Number(data.days),
        });
    }

    async deductBalance(employeeId, locationId, days) {
        const record = await this.getBalance(employeeId, locationId);

        if (!record) {
            return { success: false };
        }

        if (record.days < Number(days)) {
            return { success: false };
        }

        record.days = record.days - Number(days);

        await this.balanceRepository.save(record);

        return { success: true };
    }
}

InjectRepository(BalanceEntity)(BalanceService, undefined, 0);