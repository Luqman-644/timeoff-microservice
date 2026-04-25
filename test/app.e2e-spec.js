const request = require('supertest');

describe('TimeOff Microservice (e2e)', () => {
  let app;

  beforeAll(async () => {
    const { Test } = require('@nestjs/testing');
    const { AppModule } = require('../src/app.module');

    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  it('GET / should return Hello World', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });

  it('POST /balance should create balance', () => {
    return request(app.getHttpServer())
      .post('/balance')
      .send({
        employeeId: 1,
        locationId: "10",
        employeeName: "Luqman",
        days: 10
      })
      .expect(201);
  });

  it('GET /balance should return balance', () => {
    return request(app.getHttpServer())
      .get('/balance/1/10')
      .expect(200);
  });

  it('POST /timeoff/request should create request', () => {
    return request(app.getHttpServer())
      .post('/timeoff/request')
      .send({
        employeeId: 1,
        locationId: 10,
        days: 2
      })
      .expect(201);
  });

  it('GET /timeoff/requests should return list', () => {
    return request(app.getHttpServer())
      .get('/timeoff/requests')
      .expect(200);
  });

  it('POST /mock-hcm/balance/add should update HCM balance', () => {
    return request(app.getHttpServer())
      .post('/mock-hcm/balance/add')
      .send({
        employeeId: 1,
        locationId: 10,
        days: 5
      })
      .expect(201);
  });

});