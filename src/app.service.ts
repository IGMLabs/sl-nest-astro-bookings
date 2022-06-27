import { Injectable } from "@nestjs/common";

@Injectable()
export class AppService {
  getHello(): string {
    return "Hello World!";
  }

  public multiply(someNumber: number, otherNumber: number): number {
    const multiply = someNumber * otherNumber;
      return multiply;
  }

}

