
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import { Subject } from "rxjs/Subject";

@Injectable()
export class TypingService {
  private randomTextUri = "https://baconipsum.com/api/?type=all-meat&sentences=5";
  typingComplete = false;
  sourceCharLength: number;
  sourceWordCount: number;
  liveWordCount: number;
  liveCharLength: number;
  private sourceComponent = new Subject<any>();
  sourceComponentCalled = this.sourceComponent.asObservable();
  sourceText: string;
  private inputComponent = new Subject<any>();
  inputComponentCalled = this.inputComponent.asObservable();
  inputText: string;

  constructor(private http: HttpClient) {
    this.sourceCharLength = 0;
    this.sourceWordCount = 0;
    this.liveWordCount = 0;
    this.liveCharLength = 0;
  }

  getGibberish(): Observable<Object> {
    return this.http.get(this.randomTextUri);
  }

  private handleError(operation: string): void {

    console.error("${operation} failed");
  }

  getSourceText(): string {
    this.sourceComponent.next("get");
    return this.sourceText;
  }

  getInputText(): string {
    this.inputComponent.next("get");
    return this.inputText;
  }

  setSourceText(newValue) {
    this.sourceText = newValue;
    this.sourceComponent.next("set");
  }

  setInputText(newValue) {
    this.inputText = newValue;
    this.inputComponent.next("set");
  }
}