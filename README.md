# 🧾 Time-Off Microservice (NestJS + SQLite)

## 📌 Overview

This project implements a Time-Off Microservice using NestJS (JavaScript) and SQLite.

It manages:
- Employee leave balances (per employee + location)
- Time-off request lifecycle
- Integration with a mock HCM system (Workday/SAP simulation)

The system ensures balance integrity, handles real-time and batch updates, and is designed defensively to prevent inconsistencies.

## 🧠 Problem Statement

Keeping employee leave balances consistent between:
- **Internal system** (ReadyOn)
- **External system** (HCM)

...is challenging because:
- Multiple systems can update balance
- HCM is the source of truth
- Balance updates can be real-time or batch
- Requests must be validated against current balance

## 🏗️ Architecture

`Mock HCM → Balance Service → Timeoff Service`
- **Balance Service** → stores leave days in database
- **Timeoff Service** → handles leave requests and deduction
- **Mock HCM** → simulates external HR system updates

## ⚙️ Tech Stack

- NestJS (JavaScript)
- SQLite (TypeORM)
- REST APIs
- Postman (testing)

## 📊 Data Model

Each employee is uniquely identified by: `employeeId` + `locationId`

Each record contains:
- `employeeId`
- `locationId`
- `employeeName`
- `days` (leave balance)

## 🚀 API Endpoints

### 🟢 Balance APIs

**Create Balance**  
`POST /balance`
```json
{
  "employeeId": 1,
  "locationId": "L1",
  "employeeName": "Devid",
  "days": 10
}
```

**Get Balance**  
`GET /balance/:employeeId/:locationId`

### 🔵 Time-Off APIs

**Request Time-Off**  
`POST /timeoff/request`
```json
{
  "employeeId": 1,
  "locationId": "L1",
  "days": 2
}
```
*Behavior:*
- Validates available balance
- Deducts days if sufficient
- Rejects if insufficient
- Saves request

**Get All Requests**  
`GET /timeoff/requests`

### 🟡 Mock HCM APIs (Simulation)

**Add Days (Accrual)**  
`POST /mock-hcm/balance/add`
```json
{
  "employeeId": 1,
  "locationId": "L1",
  "days": 5
}
```

**Batch Sync (Full HCM Update)**  
`POST /mock-hcm/balance/batch`
```json
[
  {
    "employeeId": 1,
    "locationId": "L1",
    "employeeName": "Devid",
    "days": 20
  },
  {
    "employeeId": 2,
    "locationId": "L1",
    "employeeName": "Steve",
    "days": 15
  }
]
```

## 🔄 System Behavior

**Time-Off Flow**
1. Employee requests leave
2. System checks balance
3. If valid → deduct days
4. Save request
5. Return response

**HCM Sync Flow**
1. HCM updates balance (single or batch)
2. System updates local database
3. Ensures consistency

## 🛡️ Key Features

- ✔ Balance integrity validation
- ✔ Defensive programming (invalid cases handled)
- ✔ Real-time + batch HCM sync
- ✔ Persistent storage (SQLite)
- ✔ Modular NestJS architecture

## 🧪 Test Scenarios

The following scenarios were tested:
- Create employee balance
- Fetch balance
- Request time off (valid)
- Request time off (insufficient balance → rejected)
- HCM adds days
- Batch sync updates multiple employees
- Data persists after restart

## ▶️ Running the Project

**Install dependencies**
```bash
npm install
```

**Start server**
```bash
npm run start
```

**Server URL**
http://localhost:3001

## 🗄️ Database

- SQLite file: `timeoff.sqlite`
- Data persists across restarts

## ⚠️ Notes

- `days` represents leave balance
- HCM is treated as source of truth
- System supports both incremental and full sync
- Designed to handle real-world edge cases

## 🚀 Future Improvements

- Manager approval workflow (Pending → Approved/Rejected)
- Input validation (DTO)
- Swagger API documentation
- Automated test suite (Jest)
- Event-driven sync (Kafka/Webhooks)

## 📌 Conclusion

This microservice demonstrates a practical solution to:  
*Maintaining consistent leave balances between internal systems and external HCM systems*
