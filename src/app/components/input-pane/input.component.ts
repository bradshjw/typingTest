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
  placeholder: string;
  constructor(private typingService: TypingService, private timerService: TimerService) {
    this.typingService.inputComponentCalled.subscribe((res) => {
      if (res === "get") {
        this.typingService.inputText = this.typingInput.nativeElement.value.toString();
      } else if (res === "set") {
        this.typingInput.nativeElement.value = this.typingService.inputText;
      }
    });
  }

  ngOnInit(): void {
    this.placeholder = "Type here";
  }

  startTimer(): void {
    this.timerService.startTimer();
  }

  stopTimer(): void {
    this.timerService.stopTimer();
    this.typingInput.nativeElement.disabled = true;
  }

  keydown(event: KeyboardEvent) {
    if (event.key === "Backspace") {
      event.preventDefault();
    } else {
      this.keypress(event);
    }
  }

  keypress(event: KeyboardEvent): void {
    if (event.key === " " || event.key === "." || event.key === "Enter") {
      this.calculateWordCount(this.typingInput.nativeElement.value.toString());
    }

    this.typingService.liveCharLength = this.typingInput.nativeElement.value.toString().length;

    if (!this.timerService.timerHasStarted) {
      this.startTimer();
      this.typingService.typingComplete = false;
    }

    if (this.typingService.sourceCharLength === this.typingService.liveCharLength) {
      this.stopTimer();
      this.typingService.typingComplete = true;
      this.calculateWordCount(this.typingInput.nativeElement.value.toString());
    }
  }

  private calculateWordCount(rawText: string): void {
    const strArray = rawText.split(/[ |\r\n]+/);
    this.typingService.liveWordCount = strArray.length;
  }

  ngAfterViewInit(): void { }

}