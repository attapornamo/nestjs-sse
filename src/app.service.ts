import { Injectable, OnModuleInit } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Injectable()
export class AppService implements OnModuleInit {
  constructor(private eventEmitter: EventEmitter2) {}

  private sseInterval: NodeJS.Timeout;

  onModuleInit() {
    this.sseInterval = setInterval(() => this.sse('sync-data'), 5000);
  }

  async onModuleDestroy() {
    clearInterval(this.sseInterval);
  }

  sse(event: string) {
    this.eventEmitter.emit(event, {
      message: 'You have new notification',
      timestamp: Date.now(),
    });
  }

  pushMessage(event: string, message: string) {
    this.eventEmitter.emit(event, { message, timestamp: Date.now() });
  }
}
