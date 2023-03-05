import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    OnInit,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AnimeFormat } from '@app/shared/models/anime/anime-format';
import { AnimeShort } from '@app/shared/models/anime/anime-short';
import { AnimeStatus } from '@app/shared/models/anime/anime-status';
import { AnimeService } from '@app/shared/services/anime.service';

@Component({
    selector: 'app-animes',
    templateUrl: './animes.component.html',
    styleUrls: ['./animes.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AnimesComponent implements OnInit {
    animeList: AnimeShort[];
    page = 1;
    perPage = 5;
    hasNextPage = true;

    isLoading = true;

    filters = {
        selectedStatus: AnimeStatus.FINISHED,
        searchName: null,
        selectedFormats: [AnimeFormat.MANGA, AnimeFormat.MOVIE],
    };

    constructor(
        private animeService: AnimeService,
        private changeDetectorRef: ChangeDetectorRef,
        private activatedRoute: ActivatedRoute,
        private router: Router
    ) {}

    ngOnInit() {
        this.activatedRoute.queryParams.subscribe((params) => {
            const status = params['status'] || AnimeStatus.FINISHED,
                search = params['search'] || null,
                formats = params['formats'] || [
                    AnimeFormat.MANGA,
                    AnimeFormat.MOVIE,
                ],
                page = +params['page'] || 1;

            this.filters = {
                selectedStatus: status,
                searchName: search,
                selectedFormats: formats,
            };

            this.page = page;

            this.loadData();
            this.changeDetectorRef.detectChanges();
        });
    }

    setFilter() {
        this.page = 1;
        this.updateUrl();
    }

    updateUrl() {
        this.router.navigate(['/animes'], {
            queryParams: {
                status: this.filters.selectedStatus,
                search: this.filters.searchName,
                formats: this.filters.selectedFormats,
                page: this.page,
            },
        });
    }

    async loadData() {
        this.isLoading = true;

        const filters = this.getAllFiltes();

        this.animeService.getAnimeList(filters).subscribe((res) => {
            this.animeList = res.Page.media;
            this.hasNextPage = res.Page.pageInfo.hasNextPage;

            this.isLoading = false;
            this.changeDetectorRef.detectChanges();
        });
    }

    getAllFiltes() {
        return {
            page: this.page,
            perPage: this.perPage,
            format_in: this.filters.selectedFormats,
            status: this.filters.selectedStatus,
            search: this.filters.searchName,
        };
    }
}
