import { ArgumentsHost, Logger } from "@nestjs/common";
import { Request, Response } from "express";
import { ResponseError } from "./response-error.interface";

export class ExpressFilter {
  protected request!: Request;
  protected response!: Response;
  protected extractExpressData(host: ArgumentsHost) {
    // ! http specific
    const httpContext = host.switchToHttp();
    // ! express specific
    this.response = httpContext.getResponse<Response>();
    this.request = httpContext.getRequest<Request>();
  }
  protected sendResponseError(responseError: ResponseError, logger: Logger) {
    logger.error(responseError);
    this.response.status(responseError.statusCode).json(responseError);
  }
}