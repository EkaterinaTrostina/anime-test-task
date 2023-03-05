import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AnimesRoutingModule } from './animes-routing.module';
import { AnimesComponent } from './animes.component';
import { AnimesItemComponent } from './components/animes-item/animes-item.component';
import { SharedModule } from '@app/shared/shared.module';
import { FormsModule } from '@angular/forms';
import { AnimesFiltersComponent } from './components/animes-filters/animes-filters.component';


@NgModule({
  declarations: [
    AnimesComponent,
    AnimesItemComponent,
    AnimesFiltersComponent
  ],
  imports: [
    CommonModule,
    AnimesRoutingModule,
    SharedModule,
    FormsModule
  ]
})
export class AnimesModule { }
