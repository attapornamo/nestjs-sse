import { Injectable, OnModuleInit } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Injectable()
export class AppService implements OnModuleInit {
  constructor(private eventEmitter: EventEmitter2) {}

  onModuleInit() {
    setInterval(async () => {
      this.sse();
    }, 3000);
  }

  async sse() {
    this.eventEmitter.emit('sse.event', {
      message: 'You have new notification',
      timestamp: new Date(),
    });
  }
}
