import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-input-pane",
  templateUrl: "./input.component.html",
  styleUrls: ["./input.component.css"]
})
export class InputComponent implements OnInit {
  placeholder: string;
  constructor() { }

  ngOnInit(): void {
    this.placeholder = "Timer will begin once you start typing";
  }

}