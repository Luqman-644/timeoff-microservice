const { BalanceService } = require('./balance.service');

describe('BalanceService', () => {
  let service;

  beforeEach(() => {
    service = new BalanceService();

    // ✅ MOCK repository
    service.balanceRepository = {
      save: jest.fn().mockResolvedValue({ id: 1 }),
      findOne: jest.fn()
    };
  });

  it('should create balance correctly', async () => {
    const result = await service.createBalance({
      employeeId: 1,
      locationId: "10",
      employeeName: "Test",
      days: 10
    });

    expect(result).toBeDefined();
  });
});