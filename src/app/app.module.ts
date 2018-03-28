import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'


import { AppComponent } from './app.component';
import { DataService } from './services/data.service';
import { ChainInfoComponent } from './components/chain-info/chain-info.component';
import { BlockInfoComponent } from './components/block-info/block-info.component';
import { AngularFontAwesomeModule } from 'angular-font-awesome';

@NgModule({
  declarations: [
    AppComponent,
    ChainInfoComponent,
    BlockInfoComponent 
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AngularFontAwesomeModule
    
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
