import { Component, OnInit } from "@angular/core";
import { TypingService } from "../../services/typing.service";
import { TimerService } from "../../services/timer.service";
import { HttpErrorResponse } from "@angular/common/http/src/response";

@Component({
  selector: "app-source-pane",
  templateUrl: "./source.component.html",
  styleUrls: ["./source.component.css"]
})
export class SourceComponent implements OnInit {
  manualInput: boolean;
  constructor(public typingService: TypingService, public timerService: TimerService) { }

  // by default, manual input will be enabled
  ngOnInit(): void {
    this.manualInput = true;
  }

  // user can select to auto-generate source text
  // doing so will change the manual input flag
  generateText(): void {
    this.typingService.getGibberish().subscribe(data => {
      this.manualInput = false;
      this.typingService.sourceText = data.toString();
    }, (err: HttpErrorResponse) => {
      if (err.error instanceof Error) {
        this.typingService.handleError("getGibberish", err.error.message);
      } else {
        this.typingService.handleError("getGibberish", "status code ${err.status}");
      }
    });
  }

  // clearing the source text
  clear(): void {
    this.manualInput = true;
    this.typingService.sourceText = "";
  }

}