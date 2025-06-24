import { HttpClientModule } from '@angular/common/http';
import { FileUpload } from './file-upload/file-upload';
import { Component, inject } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-create-component',
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    FileUpload,
    HttpClientModule,
  ],
  templateUrl: './create-component.html',
  styleUrl: './create-component.scss',
})
export class CreateComponent {}
