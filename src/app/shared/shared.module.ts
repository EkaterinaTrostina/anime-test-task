import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginationComponent } from './components/pagination/pagination.component';
import { RadioSelectComponent } from './components/radio-select/radio-select.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputComponent } from './components/input/input.component';
import { CheckboxesSelectComponent } from './components/checkboxes-select/checkboxes-select.component';
@NgModule({
    declarations: [
        PaginationComponent,
        RadioSelectComponent,
        InputComponent,
        CheckboxesSelectComponent,
    ],
    imports: [CommonModule, FormsModule, ReactiveFormsModule],
    exports: [
        PaginationComponent,
        RadioSelectComponent,
        InputComponent,
        CheckboxesSelectComponent,
    ],
})
export class SharedModule {}
