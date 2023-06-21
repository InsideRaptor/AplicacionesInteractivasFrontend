import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LibroAddComponent } from './components/libro-add/libro-add.component';
import { LibroListComponent } from './components/libro-list/libro-list.component';
import { EstanteAddComponent } from './components/estante-add/estante-add.component';
import { EstanteListComponent } from './components/estante-list/estante-list.component';

@NgModule({
  declarations: [
    AppComponent,
    LibroAddComponent,
    LibroListComponent,
    EstanteAddComponent,
    EstanteListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
