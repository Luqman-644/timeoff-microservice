const { TimeoffService } = require('./timeoff.service');

describe('TimeoffService', () => {
  let service;

  beforeEach(() => {
    service = new TimeoffService();

    // ✅ MOCK balanceService
    service.balanceService = {
      deductBalance: jest.fn().mockResolvedValue(true)
    };
  });

  it('should create request with valid data', async () => {
    const result = await service.createRequest(1, "10", 2);

    expect(result).toBeDefined();
  });
});