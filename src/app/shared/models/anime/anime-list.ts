import { Pagination } from '../pagination';
import { AnimeShort } from './anime-short';

export interface AnimeList {
    Page: {
        media: AnimeShort[];
        pageInfo: Pagination;
    };
}
