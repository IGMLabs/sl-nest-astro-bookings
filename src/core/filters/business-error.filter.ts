import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus, Logger } from "@nestjs/common";
import { ExpressFilter } from "./express.filter";
import { ResponseError } from "./response-error.interface";

@Catch()
export class BusinessErrorFilter<Error> extends ExpressFilter implements ExceptionFilter {
  public catch(exception: Error, host: ArgumentsHost) {
    this.extractExpressData(host);
    const responseError = this.getResponseError(exception);
    this.sendResponseError(responseError, new Logger("BusinessErrorFilter"));
  }
  private getResponseError(exception: Error): ResponseError {
    const status = HttpStatus.BAD_REQUEST;
    const errorMessage = "👮🏼‍♂️ " + (exception as any).message;
    const responseError = {
      statusCode: status,
      message: errorMessage,
      path: this.request.url,
    };
    return responseError;
  }
}