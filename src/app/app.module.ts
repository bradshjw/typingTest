import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from "@angular/core";
import { MatButtonModule, MatFormFieldModule, MatInputModule } from "@angular/material";
import { HttpClientModule } from "@angular/common/http";
import { FormsModule } from "@angular/forms";


import { AppComponent } from "./app.component";
import { SourceComponent } from "./components/source-pane/source.component";
import { InputComponent } from "./components/input-pane/input.component";
import { SideComponent } from "./components/side-pane/side.component";
import { TypingService } from "./services/typing.service";
import { TimerComponent } from "./components/timer/timer.component";
import { TimerService } from "./services/timer.service";



@NgModule({
  declarations: [
    AppComponent,
    SourceComponent,
    InputComponent,
    SideComponent,
    TimerComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule
  ],
  providers: [TypingService, TimerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
