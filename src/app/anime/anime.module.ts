import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnimeComponent } from './anime.component';
import { AnimeRoutingModule } from './anime-routing.module';
import { AnimeCardComponent } from './anime-card/anime-card.component';

@NgModule({
    declarations: [AnimeComponent, AnimeCardComponent],
    imports: [CommonModule, AnimeRoutingModule],
})
export class AnimeModule {}
