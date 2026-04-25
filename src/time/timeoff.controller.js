const { Controller, Post, Get, Body, Inject } = require('@nestjs/common');
const { TimeoffService } = require('./timeoff.service');

function route(decorator, target, name) {
  decorator(
    target.prototype,
    name,
    Object.getOwnPropertyDescriptor(target.prototype, name)
  );
}

class TimeoffController {
  constructor(timeoffService) {
    this.timeoffService = timeoffService;
  }

  create(body) {
    return this.timeoffService.createRequest(
      body.employeeId,
      body.locationId,
      body.days
    );
  }

  list() {
    return this.timeoffService.getRequests();
  }
}

Controller('timeoff')(TimeoffController);
Inject(TimeoffService)(TimeoffController, undefined, 0);

route(Post('request'), TimeoffController, 'create');
route(Get('requests'), TimeoffController, 'list');

Body()(TimeoffController.prototype, 'create', 0);

module.exports = { TimeoffController };