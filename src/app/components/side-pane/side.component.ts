import { Component, OnInit } from "@angular/core";
import { TypingService } from "../../services/typing.service";

@Component({
  selector: "app-side-pane",
  templateUrl: "./side.component.html",
  styleUrls: ["./side.component.css"]
})
export class SideComponent implements OnInit {
  constructor(private typingService: TypingService) {
    this.typingService.startTimerCalled.subscribe((res: any) => {
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

  }

}