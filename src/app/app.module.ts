import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from "@angular/core";
import { MatButtonModule, MatFormFieldModule, MatInputModule } from "@angular/material";


import { AppComponent } from "./app.component";
import { SourceComponent } from "./source-pane/source.component";
import { InputComponent } from "./input-pane/input.component";
import { SideComponent } from "./side-pane/side.component";


@NgModule({
  declarations: [
    AppComponent,
    SourceComponent,
    InputComponent,
    SideComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
