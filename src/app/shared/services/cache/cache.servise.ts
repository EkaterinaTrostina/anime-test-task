import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class CacheMemoryService {
    private defaultLifeTime = 1000 * 60;
    
    private cache: Map<any, {value: any, expiredAt: number}> = new Map()

    set(key: any, value: any, lifetime: number | null = null): void {
        lifetime = lifetime || this.defaultLifeTime;
        const expiredAt = Date.now() + lifetime;
        this.cache.set(key, {expiredAt: expiredAt, value: value})
    }

    get(key: any): any | null {
        const item = this.cache.get(key);

        if(!item) {
            return null;
        }

        if (!this.isValid(item)) {
            this.remove(key);
            return null
        }

        return item.value;
    }

    remove(key: any): void {
        this.cache.delete(key)
    }

    clear(): void {
        this.cache = new Map();
    }

    has(key: any): boolean {
        if (!key) {
            return false;
        }

        const item = this.cache.get(key);

        if (!item) {
            return false;
        }

        if (!this.isValid(item)) {
            this.remove(key);
            return false;
        }

        return true;
    }

    isValid(item): boolean {
        return item.expiredAt > 0 && Date.now() - item.expiredAt < 0;
    }
}
