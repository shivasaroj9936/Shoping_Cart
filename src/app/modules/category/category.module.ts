import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoryRoutingModule } from './category-routing.module';
import { CategoryComponent } from './category.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { TableComponent } from 'src/app/table/table.component';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { CustomPipePipe } from 'src/app/pipes/custom-pipe.pipe';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { FormsService } from 'src/app/services/forms.service';
import { FormPipePipe } from 'src/app/pipes/formPipe/form-pipe.pipe';




@NgModule({
  declarations: [
    CategoryComponent,
    TableComponent,
    CustomPipePipe,
    FormPipePipe
  ],
  imports: [
    CommonModule,
    CategoryRoutingModule,
    MatFormFieldModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    MatSnackBarModule
  ],
  providers: [FormsService],

})
export class CategoryModule { }
