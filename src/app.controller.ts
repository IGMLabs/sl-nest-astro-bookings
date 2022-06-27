import { Body, Controller, Get, HttpException, HttpStatus, Param, ParseIntPipe, Post, Query } from "@nestjs/common";
import { AppService } from "./app.service";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  public getHello(): string {
    return this.appService.getHello();
  }

  @Post('')
  public postHello(@Body()name: string): string {
    const type = typeof name;
    const nameString = JSON.stringify(name);
    return `Body: ${nameString} of type ${type}`;
  }
  

  @Get("/test")
  public getTest(): string {
    return "Hola Test";
  }

  @Get("/param/:id")
  public getParam(@Param("id") id: string): string {
    const type = typeof id;
    return `Param: ${id} of type ${type}`;
  }

  @Get("/square/:someParam")
  public getSquare(@Param("someParam") someParam: number): string {
    const type = typeof someParam;
    const square = someParam * someParam;
    return `Square of: ${someParam} of type ${type} is ${square}`;
  }

  @Get("/square/nan/:someParam")
  public getSquarePipeNan(@Param("someParam") someParam: number): string {
    const type = typeof someParam;
    const someNumber = parseInt(someParam.toString()); 
    if (isNaN(someNumber)) 
      throw new HttpException(`${someNumber} is not a number`, HttpStatus.BAD_REQUEST);
    const square = someNumber * someNumber;
    return `Square of: ${someNumber} of type ${type} is ${square}`;
  }

  @Get("/square/pipe/:someParam")
  public getSquarePipe(@Param("someParam", ParseIntPipe) someNumber: number): string {
    const type = typeof someNumber;    
    const square = someNumber * someNumber;
    return `Square of: ${someNumber} of type ${type} is ${square}`;
  }

  @Get("/multiply/:someNumber/:otherNumber")
  public getMultiply(
    @Param("someNumber", ParseIntPipe) someNumber: number,
    @Param("otherNumber", ParseIntPipe) otherNumber: number,
    ): number {  
      return this.appService.multiply(someNumber, otherNumber);
  }

  @Get("/multiply/query")
  public getMultiplyQuery(
    @Query("a", ParseIntPipe) a: number,
    @Query("b", ParseIntPipe) b: number,
    ): number {      
    return this.appService.multiply(a,b);
  }



}
