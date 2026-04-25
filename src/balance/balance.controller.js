import { Controller, Get, Param, Inject, Post, Body } from '@nestjs/common';
import { BalanceService } from './balance.service.js';

function Route(decorator, controller, methodName) {
    decorator(
        controller.prototype,
        methodName,
        Object.getOwnPropertyDescriptor(controller.prototype, methodName)
    );
}

class BalanceController {
    constructor(balanceService) {
        this.balanceService = balanceService;
    }

    getBalance(employeeId, locationId) {
        return this.balanceService.getBalance(Number(employeeId), locationId);
    }
    create(body) {
        return this.balanceService.createBalance(body);
    }
}

Controller('balance')(BalanceController);

Inject(BalanceService)(BalanceController, undefined, 0);

Route(Get(':employeeId/:locationId'), BalanceController, 'getBalance');

Route(Post(), BalanceController, 'create');
Body()(BalanceController.prototype, 'create', 0);

Param('employeeId')(BalanceController.prototype, 'getBalance', 0);
Param('locationId')(BalanceController.prototype, 'getBalance', 1);

export { BalanceController };