import { AnimeShort } from './anime-short';
import { AnimeStaff } from './anime-staff';
import { AnimeType } from './anime-type';

export interface AnimeFull extends AnimeShort {
    episodes: number;
    seasonYear: number;
    type: AnimeType;
    staff: AnimeStaff;
}
