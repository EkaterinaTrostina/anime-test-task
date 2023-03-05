import {
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    Input,
    OnChanges,
    Output,
} from '@angular/core';
import { AnimeFormat } from '@app/shared/models/anime/anime-format';
import { AnimeStatus } from '@app/shared/models/anime/anime-status';
import { Checkbox } from '@app/shared/models/checkbox';
import { RadioInput } from '@app/shared/models/radio-input';

@Component({
    selector: 'app-animes-filters',
    templateUrl: './animes-filters.component.html',
    styleUrls: ['./animes-filters.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AnimesFiltersComponent implements OnChanges {
    @Input() filters: {
        selectedStatus: string | null;
        searchName: string | null;
        selectedFormats: string[] | null;
    };

    @Output() filtersChange = new EventEmitter();

    formatsPlacholder = 'format';
    searchNamePlacholder = 'Название';
    statusPlacholder = 'status';

    ngOnChanges() {
        if (this.filters?.selectedFormats) {
            this.updateFormats();
        }
    }

    updateSelectedFormats() {
        this.filters.selectedFormats = this.getArrayOfFormats();
        this.emitFilters();
    }

    emitFilters() {
        this.filtersChange.emit(this.filters);
    }

    getArrayOfFormats() {
        const res: string[] = [];
        this.formatsList
            .filter((format) => format.isChecked)
            .map((format) => {
                res.push(format.value);
            });
        return res;
    }

    updateFormats() {
        this.formatsList
            .filter(
                (format) =>
                    this.filters.selectedFormats?.indexOf(format.value) !== -1
            )
            .map((format) => {
                format.isChecked = true;
            });
    }

    radioStatusList: RadioInput[] = [
        {
            label: AnimeStatus.CANCELLED,
            value: AnimeStatus.CANCELLED,
        },
        {
            label: AnimeStatus.FINISHED,
            value: AnimeStatus.FINISHED,
        },
        {
            label: AnimeStatus.HIATUS,
            value: AnimeStatus.HIATUS,
        },
        {
            label: AnimeStatus.NOT_YET_RELEASED,
            value: AnimeStatus.NOT_YET_RELEASED,
        },
        {
            label: AnimeStatus.RELEASING,
            value: AnimeStatus.RELEASING,
        },
    ];

    formatsList: Checkbox[] = [
        {
            label: AnimeFormat.MANGA,
            value: AnimeFormat.MANGA,
            isChecked: false,
        },
        {
            label: AnimeFormat.MOVIE,
            value: AnimeFormat.MOVIE,
            isChecked: false,
        },
        {
            label: AnimeFormat.MUSIC,
            value: AnimeFormat.MUSIC,
            isChecked: false,
        },
        {
            label: AnimeFormat.NOVEL,
            value: AnimeFormat.NOVEL,
            isChecked: false,
        },
        {
            label: AnimeFormat.ONA,
            value: AnimeFormat.ONA,
            isChecked: false,
        },
        {
            label: AnimeFormat.ONE_SHOT,
            value: AnimeFormat.ONE_SHOT,
            isChecked: false,
        },
        {
            label: AnimeFormat.OVA,
            value: AnimeFormat.OVA,
            isChecked: false,
        },
        {
            label: AnimeFormat.SPECIAL,
            value: AnimeFormat.SPECIAL,
            isChecked: false,
        },
        {
            label: AnimeFormat.TV,
            value: AnimeFormat.TV,
            isChecked: false,
        },
        {
            label: AnimeFormat.TV_SHORT,
            value: AnimeFormat.TV_SHORT,
            isChecked: false,
        },
    ];
}
