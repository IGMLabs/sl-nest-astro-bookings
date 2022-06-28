import { Injectable } from '@nestjs/common';
import { ClientDto } from './models/client.dto';
import { Client } from './models/client.interface';

export class AppServiceBase {
  public getHello(): string {
    return 'Hello World!';
  }

  public multiply(someNumber: number, otherNumber: number): number {
    const multiply = someNumber * otherNumber;
    return multiply;
  }

  public divide(someNumber: number, otherNumber: number): number {
    if (otherNumber === 0) throw new Error(`${otherNumber} is CERO`);
    return someNumber / otherNumber;
  }

  public squareRoot(someNumber: number): number {
    return Math.sqrt(someNumber);
  }

  public saveClient(clientDto: ClientDto): Client {
    const client: Client = { ...clientDto };
    client.id = Math.random().toString();
    return client;
  }

  public updateClient(clientId: string, client: Client): Client {
    if (clientId !== '') {
      throw new Error('NOT FOUND: ' + clientId);
    }
    return client;
  }
}

@Injectable()
export class AppService extends AppServiceBase {}
