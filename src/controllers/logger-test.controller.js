import { loggerTestService } from '../services/logger-test.service.js';

class LoggerTestController {
  run(req, res) {
    res.status(200).json(loggerTestService.run());
  }
}

export const loggerTestController = new LoggerTestController();
