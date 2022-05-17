import { Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";

@Injectable()
export class UsersValidationMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const { username, password } = req.body || {};
    if (!(username && password)) {
      return res.status(400).json({
        status: "failed",
        message: "Invalid input",
      });
    }

    next();
  }
}
