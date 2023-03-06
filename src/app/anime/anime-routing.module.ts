import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AnimeComponent } from './anime.component';

const routes: Routes = [
    { path: ':id', pathMatch: 'full', component: AnimeComponent },
    { path: '', pathMatch: 'full', redirectTo: '/animes' },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class AnimeRoutingModule {}
