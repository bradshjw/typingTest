
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
    this.timerService.startTimerCalled.subscribe((res: any) => {
      if (res === "begin") {
        this.startTimer();
      } else if (res === "end") {
        this.stopTimer();
      }
    });
  }

  ngOnInit(): void {

  }

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

  private stopTimer() {
    this.timerService.ticks = 0;
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

  private getSeconds(ticks: number) {
    return this.pad(ticks % 60);
  }

  private getMinutes(ticks: number) {
    return this.pad(Math.floor(ticks / 60));
  }

  private pad(digit: any) {
    return digit <= 9 ? "0" + digit : digit;
  }
}