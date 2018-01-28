
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import { Subject } from "rxjs/Subject";

@Injectable()
export class TypingService {
  // hard-coded api url
  // before going to production environment, the api url should be
  // in some config file and the parameters should be configurable
  // from the UI
  private randomTextUri = "https://baconipsum.com/api/?type=all-meat&sentences=5";
  typingComplete = false;
  sourceWordCount: number;
  liveWordCount: number;
  liveCharLength: number;
  sourceText: string;
  inputText: string;

  constructor(private http: HttpClient) {
    this.sourceWordCount = 0;
    this.liveWordCount = 0;
    this.liveCharLength = 0;
    this.sourceText = "";
    this.inputText = "";
  }

  // make API call to get random text
  getGibberish(): Observable<Object> {
    return this.http.get(this.randomTextUri);
  }

  // error handling
  handleError(operation: string, message: string): void {
    console.error("${operation} failed with message: ${message}");
  }
}