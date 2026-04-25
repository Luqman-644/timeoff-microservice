import { Controller, Get, Post, Param, Body, Inject } from '@nestjs/common';
import { HcmService } from './hcm.service.js';

function Route(decorator, target, name) {
  decorator(
    target.prototype,
    name,
    Object.getOwnPropertyDescriptor(target.prototype, name)
  );
}

class HcmController {
  constructor(hcmService) {
    this.hcmService = hcmService;
  }

  getBalance(employeeId, locationId) {
    return this.hcmService.getBalance(employeeId, locationId);
  }

  addBalance(body) {
    return this.hcmService.addBalance(
      body.employeeId,
      body.locationId,
      body.days
    );
  }
  batch(body) {
    return this.hcmService.batchUpdate(body);
  }
}

Controller('mock-hcm')(HcmController);
Inject(HcmService)(HcmController, undefined, 0);

Route(Get('balance/:employeeId/:locationId'), HcmController, 'getBalance');
Param('employeeId')(HcmController.prototype, 'getBalance', 0);
Param('locationId')(HcmController.prototype, 'getBalance', 1);

Route(Post('balance/add'), HcmController, 'addBalance');
Body()(HcmController.prototype, 'addBalance', 0);

Route(Post('balance/batch'), HcmController, 'batch');
Body()(HcmController.prototype, 'batch', 0);

export { HcmController };