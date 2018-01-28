
import { Component, OnInit } from "@angular/core";
import { Observable, Subscription } from "rxjs/RX";
import { TimerService } from "../../services/timer.service";

@Component({
  selector: "app-timer",
  templateUrl: "./timer.component.html",
  styleUrls: ["./timer.component.css"]
})
export class TimerComponent implements OnInit {
  minutes = 0;
  seconds = 0;
  sub: Subscription;

  constructor(private timerService: TimerService) {
    // subscribe to timer service property to listen for
    // component-to-component communication
    this.timerService.startTimerCalled.subscribe((res: any) => {
      if (res === "begin") {
        this.startTimer();
      } else if (res === "end") {
        this.stopTimer();
      } else if (res === "reset") {
        this.resetTimer();
      }
    });
  }

  ngOnInit(): void { }

  // starts the timer
  private startTimer() {
    if (this.timerService.ticks === 0) {
      const timer = Observable.timer(1, 1000);
      this.sub = timer.subscribe(t => {
        this.timerService.ticks = t;
        this.seconds = this.getSeconds(this.timerService.ticks);
        this.minutes = this.getMinutes(this.timerService.ticks);
      });
    }

  }

  // stops the timer
  private stopTimer() {
    this.timerService.ticks = 0;
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

  // resets the timer
  private resetTimer() {
    this.stopTimer();
    this.seconds = 0;
    this.minutes = 0;
  }

  // ticks to seconds
  private getSeconds(ticks: number) {
    return this.pad(ticks % 60);
  }

  // ticks to minutes
  private getMinutes(ticks: number) {
    return this.pad(Math.floor(ticks / 60));
  }

  // padding helper
  private pad(digit: any) {
    return digit <= 9 ? "0" + digit : digit;
  }
}