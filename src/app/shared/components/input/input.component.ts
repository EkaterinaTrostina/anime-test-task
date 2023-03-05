import { Component, Input, OnInit } from '@angular/core';
import {
    ControlValueAccessor,
    FormControl,
    NG_VALUE_ACCESSOR,
} from '@angular/forms';
import { debounceTime, pairwise } from 'rxjs';

@Component({
    selector: 'app-input',
    templateUrl: './input.component.html',
    styleUrls: ['./input.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            multi: true,
            useExisting: InputComponent,
        },
    ],
})
export class InputComponent implements ControlValueAccessor, OnInit {
    @Input() label: string;
    @Input() name: string;

    inputControl = new FormControl();

    onChange = (value: any) => {};
    onTouched = (value: any) => {};

    writeValue(value: string) {
        this.inputControl.setValue(value);
    }

    registerOnChange(fn: any) {
        this.onChange = fn;
    }

    registerOnTouched(fn: any) {
        this.onTouched = fn;
    }

    ngOnInit(): void {
        this.inputControl.valueChanges
            .pipe(debounceTime(500), pairwise())
            .subscribe(([prev, cur]) => {
                if (prev !== cur) {
                    this.change(cur);
                }
            });
    }

    change(value: string | null) {
        this.onChange(value);
        this.onTouched(value);
    }
}
