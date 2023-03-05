import { Component } from '@angular/core';
import { Location } from '@angular/common';

@Component({
    selector: 'app-anime',
    templateUrl: './anime.component.html',
    styleUrls: ['./anime.component.scss'],
})
export class AnimeComponent {
    constructor(private _location: Location) {}

    back() {
        this._location.back();
    }
}
