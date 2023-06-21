import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EstanteAddComponent } from './components/estante-add/estante-add.component';
import { EstanteListComponent } from './components/estante-list/estante-list.component';
import { LibroAddComponent } from './components/libro-add/libro-add.component';
import { LibroListComponent } from './components/libro-list/libro-list.component';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
  { path: 'estanteAdd', component: EstanteAddComponent },
  { path: 'estanteList', component: EstanteListComponent },
  { path: 'libroAdd', component: LibroAddComponent },
  { path: 'libroList', component: LibroListComponent },
  { path: 'home', component: HomeComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
