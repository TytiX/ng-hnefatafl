import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DragDropModule } from '@angular/cdk/drag-drop';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HnefataflComponent } from './hnefatafl/hnefatafl.component';
import { HnefataflBoardComponent } from './hnefatafl/hnefatafl-board/hnefatafl-board.component';

@NgModule({
  declarations: [
    AppComponent,
    HnefataflComponent,
    HnefataflBoardComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    DragDropModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
