import { Component, Input } from '@angular/core';
import { AnimeShort } from '@app/shared/models/anime/anime-short';

@Component({
    selector: 'app-animes-item',
    templateUrl: './animes-item.component.html',
    styleUrls: ['./animes-item.component.scss'],
})
export class AnimesItemComponent {
    @Input() anime: AnimeShort;
}
