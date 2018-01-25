import { Component, OnInit } from "@angular/core";
import * as faker from "faker";

@Component({
  selector: "app-source-pane",
  templateUrl: "./source.component.html",
  styleUrls: ["./source.component.css"]
})
export class SourceComponent implements OnInit {
  sourceText: string;
  charLength: number;
  wordCount: number;
  constructor() { }

  ngOnInit(): void {
    this.sourceText = "This is placeholder text";
    this.charLength = 0;
    this.wordCount = 0;
  }

  generateText(): void {
    this.sourceText = faker.lorem.paragraphs(2);
    this.charLength = this.sourceText.length;
    const wordsArray = this.sourceText.split(" ");
    this.wordCount = wordsArray.length;
  }

}