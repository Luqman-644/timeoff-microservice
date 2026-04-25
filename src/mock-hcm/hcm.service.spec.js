const { HcmService } = require('./hcm.service');

describe('HcmService', () => {
    let service;

    beforeEach(() => {
        service = new HcmService();

        // ✅ MOCK repository
        service.balanceRepository = {
            findOne: jest.fn().mockResolvedValue({}),
            save: jest.fn(),
        };
    });

    it('should add balance in mock HCM', async () => {
        const result = await service.addBalance(1, "10", 5);

        expect(result).toBeDefined();
    });
});