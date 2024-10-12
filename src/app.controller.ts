import {
  Controller,
  Sse,
  MessageEvent,
  Post,
  Body,
  Param,
} from '@nestjs/common';
import { AppService } from './app.service';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Observable } from 'rxjs';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private eventEmitter: EventEmitter2,
  ) {}

  @Sse('/notification/:topic')
  sse(@Param('topic') topic: string): Observable<MessageEvent> {
    return new Observable((observer) => {
      const eventHandler = (payload: unknown) => {
        observer.next({ data: JSON.stringify(payload) });
      };
      this.eventEmitter.on(topic, eventHandler);
      return () => this.eventEmitter.off(topic, eventHandler);
    });
  }

  @Post('push-message')
  async pushMesssage(
    @Body() { topic, message }: { topic: string; message: string },
  ) {
    this.eventEmitter.emit(topic, { message, timestamp: new Date() });
    return 'Push message to ' + topic + ' success.';
  }
}
