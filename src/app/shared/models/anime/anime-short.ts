import { AnimeFormat } from './anime-format';
import { AnimeStatus } from './anime-status';

export interface AnimeShort {
    id: number;
    format: AnimeFormat;
    status: AnimeStatus;
    title: {
        romaji: string;
    };
}
