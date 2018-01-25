
import { Component, OnInit } from "@angular/core";
import { TypingService } from "../../services/typing.service";
import { Observable, Subscription } from "rxjs/RX";

@Component({
  selector: "app-timer",
  templateUrl: "./timer.component.html",
  styleUrls: ["./timer.component.css"]
})
export class TimerComponent implements OnInit {
  ticks = 0;
  start = 0;
  minutes = 0;
  seconds = 0;
  sub: Subscription;
  constructor(private typingService: TypingService) {
    this.typingService.startTimerCalled.subscribe((res: any) => {
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
    if (this.ticks === 0) {
      const timer = Observable.timer(1, 1000);
      this.sub = timer.subscribe(t => {
        this.ticks = t;
        this.seconds = this.getSeconds(this.ticks);
        this.minutes = this.getMinutes(this.ticks);
      });
    }

  }

  private stopTimer() {
    this.start = 0;
    this.ticks = 0;
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