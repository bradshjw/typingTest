import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { Subject } from "rxjs/Subject";

@Injectable()
export class TimerService {
  ticks = 0;
  private timerComponent = new Subject<any>();
  startTimerCalled = this.timerComponent.asObservable();
  timerHasStarted = false;

  constructor() { }

  startTimer() {
    if (!this.timerHasStarted) {
      this.timerComponent.next("begin");
      this.timerHasStarted = true;
    }
  }

  stopTimer() {
    this.timerComponent.next("end");
    this.timerHasStarted = false;
  }
}