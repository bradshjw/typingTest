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
  constructor(private timerService: TimerService, private typingService: TypingService) {
    this.timerService.startTimerCalled.subscribe((res: any) => {
      if (res === "begin") {
        // do nothing
      } else if (res === "end") {
        this.runAnalysis();
      }
    });
  }

  ngOnInit(): void {
  }

  runAnalysis(): void {
    const totalWords = this.typingService.liveWordCount;
    const elapsedSeconds = this.timerService.ticks;
    const rawWpm = (totalWords * 60) / elapsedSeconds;
    this.wpm = this.precisionRound(rawWpm, 2);
    this.calculateAccuracy(totalWords, elapsedSeconds);
  }

  private calculateAccuracy(baseWordCount, elapsedSeconds) {
    let sourceText = this.typingService.getSourceText();
    let inputText = this.typingService.getInputText();
    let errorCount = 0;

    const sourceArray = sourceText.split(" ");
    const inputArray = inputText.split(" ");

    // span element wrappings
    const spanPre = "<span class=\"highlight\">";
    const spanPost = "</span>";

    for (const i in sourceArray) {
      if (sourceArray[i] !== inputArray[i]) {
        // add html to wrap word to highlight it for both source and input
        sourceArray[i] = spanPre + sourceArray[i] + spanPost;
        inputArray[i] = spanPre + inputArray[i] + spanPost;
        errorCount++;
      }
    }

    const rawCwpm = ((baseWordCount - errorCount) * 60) / elapsedSeconds;
    this.cwpm = this.precisionRound(rawCwpm, 2);

    // let's put it back together again
    sourceText = sourceArray.join(" ");
    inputText = inputArray.join(" ");

    // this.typingService.setSourceText(sourceText);
    // this.typingService.setInputText(inputText);
  }

  private precisionRound(num, precision): number {
    const factor = Math.pow(10, precision);
    return Math.round(num * factor) / factor;
  }

}