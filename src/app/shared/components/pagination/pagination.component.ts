import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
    selector: 'app-pagination',
    templateUrl: './pagination.component.html',
    styleUrls: ['./pagination.component.scss'],
})
export class PaginationComponent {
    @Input() page: number;
    @Output() pageChange = new EventEmitter<number>();
    @Input() hasNextPage: boolean;

    pageChangeValue(add: 1 | -1) {
        this.page += add;
        this.pageChange.emit(this.page);
    }
}
