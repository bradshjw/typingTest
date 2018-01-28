import { Component, OnInit } from "@angular/core";
import { TypingService } from "../../services/typing.service";
import { TimerService } from "../../services/timer.service";

@Component({
  selector: "app-side-pane",
  templateUrl: "./side.component.html",
  styleUrls: ["./side.component.css"]
})
export class SideComponent implements OnInit {
  wpm = 0;
  cwpm = 0;
  errorRatio: string;
  constructor(private timerService: TimerService, public typingService: TypingService) {
    this.timerService.startTimerCalled.subscribe((res: any) => {
      if (res === "begin") {
        // do nothing
      } else if (res === "end") {
        this.runAnalysis();
      }
    });
  }

  ngOnInit(): void { }

  // analyzes user's input to calculate words per minute
  // and accuracy
  runAnalysis(): void {
    const totalWords = this.typingService.liveWordCount;
    const elapsedSeconds = this.timerService.ticks;
    const rawWpm = (totalWords * 60) / elapsedSeconds;
    this.wpm = this.precisionRound(rawWpm, 2);
    this.calculateAccuracy(totalWords, elapsedSeconds);
  }

  // accuracy helper function
  private calculateAccuracy(baseWordCount, elapsedSeconds) {
    let sourceText = this.typingService.sourceText;
    let inputText = this.typingService.inputText;
    let errorCount = 0;

    // split the source and input strings
    const sourceArray = sourceText.split(/[ |\r\n]+/);
    const inputArray = inputText.split(/[ |\r\n]+/);

    // span element wrappings to indicate errors
    const spanPre = "<span class=\"highlight\">";
    const spanPost = "</span>";

    for (const i in sourceArray) {
      // if the input doesn't match the source...
      if (sourceArray[i] !== inputArray[i]) {
        // add html to wrap word to highlight it for both source and input
        sourceArray[i] = spanPre + sourceArray[i] + spanPost;
        inputArray[i] = spanPre + inputArray[i] + spanPost;
        errorCount++;
      }
    }

    // calculate correct words per minute and error ratio
    const rawCwpm = ((baseWordCount - errorCount) * 60) / elapsedSeconds;
    this.cwpm = this.precisionRound(rawCwpm, 2);
    this.errorRatio = (baseWordCount - errorCount) + " / " + baseWordCount;

    // let's put it back together again
    sourceText = sourceArray.join(" ");
    inputText = inputArray.join(" ");

    // reset the input text with appropriate highlighting
    this.typingService.inputText = inputText;
  }

  // rounds decimals to any precision
  private precisionRound(num, precision): number {
    const factor = Math.pow(10, precision);
    return Math.round(num * factor) / factor;
  }

}