import { InjectRepository } from '@nestjs/typeorm';
import { BalanceEntity } from '../balance/balance.entity.js';

export class HcmService {
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

  async addBalance(employeeId, locationId, days) {
    const record = await this.getBalance(employeeId, locationId);

    if (!record) {
      return { success: false, message: "Employee balance not found" };
    }

    record.days = record.days + Number(days);

    await this.balanceRepository.save(record);


    return {
      success: true,
      message: "HCM balance updated",
      balance: record
    };
  }
  async batchUpdate(dataArray) {
    for (const item of dataArray) {
      const existing = await this.getBalance(
        item.employeeId,
        item.locationId
      );

      if (existing) {
        existing.days = Number(item.days);
        existing.employeeName = item.employeeName || existing.employeeName;

        await this.balanceRepository.save(existing);
      } else {
        await this.balanceRepository.save({
          employeeId: Number(item.employeeId),
          locationId: item.locationId,
          employeeName: item.employeeName || "Unknown",
          days: Number(item.days),
        });
      }
    }

    return { message: "Batch sync completed" };
  }

}

InjectRepository(BalanceEntity)(HcmService, undefined, 0);