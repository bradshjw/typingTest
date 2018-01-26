import { Component, OnInit } from "@angular/core";
import { TypingService } from "../../services/typing.service";
import { TimerService } from "../../services/timer.service";

@Component({
  selector: "app-source-pane",
  templateUrl: "./source.component.html",
  styleUrls: ["./source.component.css"]
})
export class SourceComponent implements OnInit {
  sourceText: string;
  manualInput: boolean;
  constructor(private typingService: TypingService, private timerService: TimerService) {
    this.typingService.sourceComponentCalled.subscribe((res) => {
      if (res === "get") {
        this.typingService.sourceText = this.sourceText;
      } else if (res === "set") {
        this.sourceText = this.typingService.sourceText;
      }

    });
  }

  ngOnInit(): void {
    this.sourceText = "";
    this.manualInput = true;
  }

  generateText(): void {
    this.typingService.getGibberish().subscribe(data => {
      this.manualInput = false;
      this.sourceText = data;
      this.typingService.sourceCharLength = this.sourceText.length;
      const wordsArray = this.sourceText.split(" ");
      this.typingService.sourceWordCount = wordsArray.length;
    });
  }

  onKeypress(event: KeyboardEvent) {
    this.typingService.sourceCharLength = this.sourceText.length;
  }

  clear(): void {
    this.manualInput = true;
    this.sourceText = "";
  }

}