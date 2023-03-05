import {
    HttpClient,
    HttpErrorResponse,
    HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of, tap, throwError } from 'rxjs';
import { AnimeFormat } from '../models/anime/anime-format';
import { AnimeFull } from '../models/anime/anime-full';
import { AnimeList } from '../models/anime/anime-list';
import { AnimeStatus } from '../models/anime/anime-status';
import { CacheMemoryService } from './cache/cache.servise';

@Injectable({
    providedIn: 'root',
})
export class AnimeService {
    constructor(
        private http: HttpClient,
        private cacheMemoryService: CacheMemoryService
    ) {}

    private url = 'https://graphql.anilist.co?query=';

    private headers = {
        'Content-Type': 'application/json',
        Accept: 'application/json',
    };

    getAnimeList({
        page,
        perPage,
        format_in,
        status,
        search,
    }: {
        page: number;
        perPage: number;
        format_in: AnimeFormat[];
        status: AnimeStatus | null;
        search: string | null;
    }): Observable<AnimeList> {
        const query = `
            query ($id: Int, $page: Int, $perPage: Int, $status: MediaStatus, $format_in: [MediaFormat], $search: String) {
                Page(page: $page, perPage: $perPage) {
                    pageInfo {
                        hasNextPage
                    }
                    media(id: $id, status: $status, format_in: $format_in, search: $search) {
                        id
                        title {
                        romaji
                        }
                        status
                        format
                    }
                }
            }
        `;

        const variables: {
            page: number;
            perPage: number;
            format_in: AnimeFormat[];
            status: AnimeStatus | null;
            search: string | null;
        } = {
            page: page,
            perPage: perPage,
            format_in: format_in,
            status: status,
            search: search,
        };

        const url = this.url + query;

        const options: {
            query: string;
            variables: string;
            headers?: { [key: string]: string };
        } = {
            query: JSON.stringify(query),
            variables: JSON.stringify(variables),
        };

        const jsonOptions = JSON.stringify(options);

        options.headers = this.headers;

        const cache = this.cacheMemoryService.get(jsonOptions);

        if (cache) {
            return of(cache);
        }

        return this.http.post(url, options).pipe(
            map((response: any) => response.data),
            tap((val) => {
                this.cacheMemoryService.set(jsonOptions, val, 600000);
                return val;
            }),
            catchError(this.handleError)
        );
    }

    getAnimeById(id: number): Observable<AnimeFull> {
        const query = `
                    query ($id: Int) {
                        Media(id: $id) {
                            id
                            title {
                              romaji
                            }
                            type
                            seasonYear
                            format
                            status
                            episodes
                            staff {
                              nodes {
                                name {
                                  full
                                }
                              }
                            }
                        }
                  }
              `;

        const variables = {
            id: id,
        };

        const url = this.url + query;

        const options = {
            query: JSON.stringify(query),
            variables: JSON.stringify(variables),
            headers: this.headers,
        };

        return this.http.post(url, options).pipe(
            map((response: any) => response.data.Media),
            catchError(this.handleError)
        );
    }

    private handleError(error: HttpErrorResponse) {
        alert(error.message);
        return throwError(() => new Error(error.message));
    }
}
