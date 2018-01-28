import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from "@angular/core";
import { TypingService } from "../../services/typing.service";
import { TimerService } from "../../services/timer.service";

@Component({
  selector: "app-input-pane",
  templateUrl: "./input.component.html",
  styleUrls: ["./input.component.css"]
})
export class InputComponent implements OnInit, AfterViewInit {
  @ViewChild("typingInput") typingInput: ElementRef;
  // declare placeholder for input element
  placeholder: string;

  constructor(public typingService: TypingService, private timerService: TimerService) { }

  // initialization
  ngOnInit(): void {
    this.placeholder = "Type here to begin";
  }

  // starts the timer
  startTimer(): void {
    this.timerService.startTimer();
  }

  // stops the timer and disables input element
  stopTimer(): void {
    this.timerService.stopTimer();
    this.typingInput.nativeElement.disabled = true;
  }

  // resets the timer and other UI elements
  startOver(): void {
    this.timerService.resetTimer();
    this.typingService.typingComplete = false;
    this.typingService.inputText = "";
    this.typingService.liveCharLength = 0;
    this.typingService.liveWordCount = 0;
    // if the input element isn't on the page yet, no need to set
    // the disabled flag
    if (this.typingInput) {
      this.typingInput.nativeElement.disabled = false;
    }
  }

  // prevent BACKSPACE from being used during test
  keydown(event: KeyboardEvent) {
    if (event.key === "Backspace") {
      event.preventDefault();
    }
  }

  // handle other key stroke events
  keyup(event: KeyboardEvent): void {
    if (event.key === " " || event.key === "." || event.key === "Enter") {
      // calculating word count in real time
      this.calculateWordCount(this.typingService.inputText);
    }
    // real-time character count
    // thought about just incrementing on keystroke, but length check
    // is fast enough and accurate
    this.typingService.liveCharLength = this.typingService.inputText.length;

    // if the timer hasn't started, we can assume this is the first keystroke
    // and start the timer
    if (!this.timerService.timerHasStarted) {
      this.startTimer();
      this.typingService.typingComplete = false;
    }

    // if the character count for the source and the user's input are the same,
    // then we are done
    if (this.typingService.sourceText.length === this.typingService.liveCharLength) {
      this.stopTimer();
      this.typingService.typingComplete = true;
      this.calculateWordCount(this.typingService.inputText);
    }
  }

  // helper function for calculating word count
  private calculateWordCount(rawText: string): void {
    // split on space or new line
    const strArray = rawText.split(/[ |\r\n]+/);
    this.typingService.liveWordCount = strArray.length;
  }

  // AfterViewInit interface methods
  ngAfterViewInit(): void { }

}