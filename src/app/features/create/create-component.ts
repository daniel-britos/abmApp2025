import { FileuploadService } from './../../core/services/fileupload-service';
import { HttpClient } from '@angular/common/http';
import { FileUpload } from './file-upload/file-upload';
import { Component, inject } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { ImageUpload } from './image-upload/image-upload';

@Component({
  selector: 'app-create-component',
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    FileUpload,
    ImageUpload,
  ],
  templateUrl: './create-component.html',
  styleUrl: './create-component.scss',
})
export class CreateComponent {}
