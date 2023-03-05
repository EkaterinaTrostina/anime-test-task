import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    OnInit,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AnimeFull } from '@app/shared/models/anime/anime-full';
import { AnimeStaff } from '@app/shared/models/anime/anime-staff';
import { AnimeService } from '@app/shared/services/anime.service';

@Component({
    selector: 'app-anime-card',
    templateUrl: './anime-card.component.html',
    styleUrls: ['./anime-card.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AnimeCardComponent implements OnInit {
    animeId: number;
    anime: AnimeFull;
    staff: string;

    isLoading = true;

    constructor(
        private animeService: AnimeService,
        private changeDetectorRef: ChangeDetectorRef,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit(): void {
        this.activatedRoute.params.subscribe((params) => {
            this.animeId = +params['id'];

            this.loadAnime();
        });
    }

    async loadAnime() {
        this.isLoading = true;

        this.animeService.getAnimeById(this.animeId).subscribe((anime) => {
            this.anime = anime.Media;
            this.staff = this.getStaffToString(anime.Media.staff);

            this.isLoading = false;
            this.changeDetectorRef.detectChanges();
        });
    }

    getStaffToString(staff: AnimeStaff) {
        return staff.nodes.map((item) => item.name.full).join(', ');
    }
}
