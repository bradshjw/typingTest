import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from "@angular/core";
import { TypingService } from "../../services/typing.service";

@Component({
  selector: "app-input-pane",
  templateUrl: "./input.component.html",
  styleUrls: ["./input.component.css"]
})
export class InputComponent implements OnInit, AfterViewInit {
  @ViewChild("typingInput") typingInput: ElementRef;
  placeholder: string;
  constructor(private typingService: TypingService) { }

  ngOnInit(): void {
    this.placeholder = "Type here";
  }

  startTimer(): void {
    this.typingService.startTimer();
  }

  stopTimer(): void {
    this.typingService.stopTimer();
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
      const txtAreaString = this.typingInput.nativeElement.value.toString();
      const strArray = txtAreaString.split(/[ .]+/);
      this.typingService.liveWordCount = strArray.length;
    }

    this.typingService.liveCharLength = this.typingInput.nativeElement.value.toString().length;

    if (!this.typingService.timerHasStarted) {
      this.startTimer();
    }

    if (this.typingService.sourceCharLength === this.typingService.liveCharLength) {
      this.stopTimer();
    }
  }

  ngAfterViewInit(): void { }

}