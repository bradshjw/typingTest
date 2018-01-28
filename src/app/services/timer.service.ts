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

  // start the timer
  startTimer() {
    if (!this.timerHasStarted) {
      this.timerComponent.next("begin");
      this.timerHasStarted = true;
    }
  }

  // stop the timer
  stopTimer() {
    this.timerComponent.next("end");
    this.timerHasStarted = false;
  }

  // reset the timer
  resetTimer() {
    this.timerHasStarted = false;
    this.timerComponent.next("reset");
  }
}