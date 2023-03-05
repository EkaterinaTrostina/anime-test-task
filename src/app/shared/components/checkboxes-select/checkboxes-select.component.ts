import { Component, ElementRef, HostListener, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Checkbox } from '@app/shared/models/checkbox';

@Component({
    selector: 'app-checkboxes-select',
    templateUrl: './checkboxes-select.component.html',
    styleUrls: ['./checkboxes-select.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            multi: true,
            useExisting: CheckboxesSelectComponent,
        },
    ],
})
export class CheckboxesSelectComponent implements ControlValueAccessor {
    @Input() placeholder: string;

    optionsList: Checkbox[];

    isOpenList = false;

    selectedCount: number;

    constructor(private elementRef: ElementRef) {}

    @HostListener('document:mousedown', ['$event'])
    documentClick(event: MouseEvent) {
        if (
            !this.elementRef.nativeElement.contains(event.target) &&
            this.isOpenList
        ) {
            this.isOpenList = false;
        }
    }

    onChange = (value: any) => {};
    onTouched = (value: any) => {};

    writeValue(value: Checkbox[]) {
        this.optionsList = value;
        this.selectedCount = this.getSelectedCount();
    }

    registerOnChange(fn: any) {
        this.onChange = fn;
    }

    registerOnTouched(fn: any) {
        this.onTouched = fn;
    }

    change() {
        this.selectedCount = this.getSelectedCount();
        this.onChange(this.optionsList);
        this.onTouched(this.optionsList);
    }

    getSelectedCount() {
        return (this.optionsList || []).filter((option) => option.isChecked)
            .length;
    }

    toggleList() {
        this.isOpenList = !this.isOpenList;
    }
}
