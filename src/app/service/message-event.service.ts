import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BroadcastService } from './broadcast.service';

@Injectable()
export class MessageEventService {

  constructor(private broadcaster: BroadcastService) { }

  fire(data: string): void {
    this.broadcaster.broadcast(MessageEventService, data);
  }

  on(): Observable<string> {
    return this.broadcaster.on<string>(MessageEventService);
  }

}
