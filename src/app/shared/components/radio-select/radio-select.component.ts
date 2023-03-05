import { Component, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { RadioInput } from '@app/shared/models/radio-input';

@Component({
    selector: 'app-radio-select',
    templateUrl: './radio-select.component.html',
    styleUrls: ['./radio-select.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            multi: true,
            useExisting: RadioSelectComponent,
        },
    ],
})
export class RadioSelectComponent implements ControlValueAccessor {
    @Input() placeholder: string;
    @Input() value: string;
    @Input() optionsList: RadioInput[];

    onChange = (value: string) => {};
    onTouched = (value: string) => {};

    writeValue(value: string) {
        this.value = value;
    }

    registerOnChange(fn: any) {
        this.onChange = fn;
    }

    registerOnTouched(fn: any) {
        this.onTouched = fn;
    }

    change(value: string) {
        this.value = value;
        this.onChange(this.value);
        this.onTouched(this.value);
    }
}
