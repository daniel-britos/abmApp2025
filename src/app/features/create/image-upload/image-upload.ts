import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-image-upload',
  imports: [
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
  ],
  templateUrl: './image-upload.html',
  styleUrl: './image-upload.scss',
})
export class ImageUpload {
  private formBuilder = inject(FormBuilder);
  base64Image?: string;

  formImage = this.formBuilder.group({
    name: ['', { validators: [Validators.required] }],
    image: new FormControl<null | File>(null, {
      validators: [Validators.required],
    }),
  });

  selectedImage(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file: File = input.files[0];
      this.toBase64(file)
        .then((value: string) => (this.base64Image = value))
        .catch((error) => console.log(error));

      this.formImage.patchValue({ image: file });
    }
  }

  toBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  }

  saveChanges() {}
}
