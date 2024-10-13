import {
  Controller,
  Sse,
  MessageEvent,
  Post,
  Body,
  Param,
} from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Observable } from 'rxjs';

@Controller()
export class AppController {
  constructor(private eventEmitter: EventEmitter2) {}

  @Sse('/notification/:event')
  sse(@Param('event') event: string): Observable<MessageEvent> {
    return new Observable((observer) => {
      const eventHandler = (payload: unknown) => {
        observer.next({ data: JSON.stringify(payload) });
      };
      this.eventEmitter.on(event, eventHandler);
      return () => this.eventEmitter.off(event, eventHandler);
    });
  }

  @Post('push-message')
  async pushMesssage(
    @Body() { event, message }: { event: string; message: string },
  ) {
    this.eventEmitter.emit(event, { message, timestamp: new Date() });
    return 'Push message to ' + event + ' success.';
  }
}
