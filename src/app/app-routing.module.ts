import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    { path: '', redirectTo: '/animes', pathMatch: 'full' },
    {
        path: 'animes',
        loadChildren: () =>
            import('./animes/animes.module').then((m) => m.AnimesModule),
    },
    {
        path: 'anime/:id',
        loadChildren: () =>
            import('./anime/anime.module').then((m) => m.AnimeModule),
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
