import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  UseFilters,
  ValidationPipe,
} from '@nestjs/common';
import { AppService } from './app.service';
import { BusinessErrorFilter } from './core/filters/business-error.filter';
import { PositiveNumberPipe } from './core/pipes/positive-number.pipe';
import { ClientDto } from './models/client.dto';
import { Client } from './models/client.interface';

@Controller('')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('')
  public getHello(): string {
    return this.appService.getHello();
  }

  @Post('')
  public postHello(@Body() payload: unknown): string {
    const type = typeof payload;
    const nameString = JSON.stringify(payload);
    return `Body: ${payload} of type ${type}; ${nameString}`;
  }

  @Post('name')
  public postHelloName(@Body() payload: { name: string }): string {
    return `Hello ${payload.name}`;
  }

  @Get('/test')
  public getTest(): string {
    return 'Hola Test';
  }

  @Get('/param/:id')
  public getParam(@Param('id') id: string): string {
    const type = typeof id;
    return `Param: ${id} of type ${type}`;
  }

  @Get('/square/:someParam')
  public getSquare(@Param('someParam') someParam: number): string {
    const type = typeof someParam;
    const square = someParam * someParam;
    return `Square of ${someParam} of type ${type} is ${square}`;
  }

  @Get('/square/Nan/:someParam')
  public getSquareNan(@Param('someParam') someParam: number): string {
    const someNumber = parseInt(someParam.toString());
    if (isNaN(someNumber))
      throw new HttpException(
        `${someParam} is not a number`,
        HttpStatus.BAD_REQUEST,
      );
    const type = typeof someNumber;
    const square = someNumber * someNumber;
    return `Square of ${someNumber} of type ${type} is ${square}; `;
  }

  @Get('/square/pipe/:someParam')
  public getSquarePipe(
    @Param('someParam', ParseIntPipe) someNumber: number,
  ): string {
    const type = typeof someNumber;
    const square = someNumber * someNumber;
    return `Square of ${someNumber} of type ${type} is ${square}; `;
  }

  @Get('/multiply/:someNumber/:otherNumber')
  public getMultiply(
    @Param('someNumber', ParseIntPipe) someNumber: number,
    @Param('otherNumber', ParseIntPipe) otherNumber: number,
  ): number {
    const multiply = this.appService.multiply(someNumber, otherNumber);
    return multiply;
  }

  @Get('/multiply/query')
  public getMultiplyQuery(
    @Query('a', ParseIntPipe) someNumber: number,
    @Query('b', ParseIntPipe) otherNumber: number,
  ): number {
    return this.appService.multiply(someNumber, otherNumber);
  }

  @Get('/divide/:someNumber/:otherNumber')
  public getDivide(
    @Param('someNumber', ParseIntPipe) someNumber: number,
    @Param('otherNumber', ParseIntPipe) otherNumber: number,
  ): number {
    try {
      const divide = this.appService.divide(someNumber, otherNumber);
      return divide;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Get('/divide/filter/:someNumber/:otherNumber')
  @UseFilters(BusinessErrorFilter)
  public getDivideFilter(
    @Param('someNumber', ParseIntPipe) someNumber: number,
    @Param('otherNumber', ParseIntPipe) otherNumber: number,
  ): number {
    return this.appService.divide(someNumber, otherNumber);
  }

  @Get('/squareRoot/:someNumber')
  public getSquareRoot(
    @Param('someNumber', ParseIntPipe) someNumber: number,
  ): number {
    if (someNumber < 0)
      throw new HttpException(
        `${someNumber} is a negative number`,
        HttpStatus.BAD_REQUEST,
      );
    return this.appService.squareRoot(someNumber);
  }

  @Get('/squareRoot/pipe/:someNumber')
  public getSquareRootPipe(
    @Param('someNumber', PositiveNumberPipe) someNumber: number,
  ): number {
    return this.appService.squareRoot(someNumber);
  }

  @Post('client')
  public postClient(
    @Body(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
      }),
    )
    payload: ClientDto,
  ): Client {
    return this.appService.saveClient(payload);
  }

  @Put('client/:id')
  public putClient(
    @Param('id') clientId: string,
    @Body() payload: Client,
  ): Client {
    try {
      return this.appService.updateClient(clientId, payload);
    } catch (error) {
      const message: string = error.message;
      if (message.startsWith('NOT FOUND:'))
        throw new HttpException(message, HttpStatus.NOT_FOUND);
      else throw new HttpException(message, HttpStatus.BAD_REQUEST);
    }
  }
}
