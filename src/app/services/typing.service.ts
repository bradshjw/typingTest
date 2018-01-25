
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import { Subject } from "rxjs/Subject";

@Injectable()
export class TypingService {
  private randomTextUri = "http://www.randomtext.me/api/gibberish/p-3/25-45";
  private timerComponent = new Subject<any>();
  timerHasStarted = false;
  startTimerCalled = this.timerComponent.asObservable();
  sourceCharLength: number;
  sourceWordCount: number;
  liveWordCount: number;
  liveCharLength: number;

  constructor(private http: HttpClient) {
    this.sourceCharLength = 0;
    this.sourceWordCount = 0;
    this.liveWordCount = 0;
    this.liveCharLength = 0;
  }

  getGibberish(): Observable<Object> {
    return this.http.get(this.randomTextUri);
  }

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

  private handleError(operation: string): void {

    console.error("${operation} failed");
  }
}