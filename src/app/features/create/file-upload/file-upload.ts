import {
  Component,
  ElementRef,
  inject,
  OnDestroy,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

import { Subscription } from 'rxjs';

import { FileuploadService } from '../../../core/services/fileupload-service';
@Component({
  selector: 'app-file-upload',
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatProgressBarModule,
    MatSnackBarModule,
  ],
  templateUrl: './file-upload.html',
  styleUrl: './file-upload.scss',
})
export class FileUpload implements OnDestroy {
  selectedFile: File | null = null;
  uploadProgress: number = 0;
  uploadStatus: 'idle' | 'inProgress' | 'completed' | 'error' = 'idle';
  fileName: string = '';
  fileSize: number = 0;

  //selecciona el input en el DOOM
  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;

  private uploadSubscription: Subscription | undefined;

  private fileUploadService = inject(FileuploadService);
  private snackBar = inject(MatSnackBar);

  ngOnDestroy(): void {
    if (this.uploadSubscription) {
      this.uploadSubscription.unsubscribe();
    }
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
      this.fileName = this.selectedFile.name;
      this.fileSize = this.selectedFile.size;
      this.uploadStatus = 'idle';
      this.uploadProgress = 0;
    }
  }

  removeFile(): void {
    this.selectedFile = null;
    this.fileName = '';
    this.fileSize = 0;
    this.uploadStatus = 'idle';
    this.uploadProgress = 0;

    // Resetea el valor del input file en caso que se cancele y se vuelva a cargar un archivo
    if (this.fileInput) {
      this.fileInput.nativeElement.value = '';
    }
  }

  uploadFile(): void {
    if (!this.selectedFile) {
      this.snackBar.open(
        'Por favor, selecciona un archivo primero.',
        'Cerrarr',
        { duration: 3000 }
      );
      return;
    }

    if (!this.selectedFile.type.includes('pdf')) {
      this.snackBar.open('Solo se permiten archivos PDF.', 'Cerrar', {
        duration: 3000,
      });
      this.removeFile();
      return;
    }

    if (this.selectedFile.size > 5 * 1024 * 1024) {
      // Ejemplo: 5 MB de límite
      this.snackBar.open(
        'El archivo es demasiado grande (máx. 5 MB).',
        'Cerrar',
        { duration: 3000 }
      );
      this.removeFile();
      return;
    }

    this.uploadStatus = 'inProgress';

    const extraData = {
      description: 'Documento PDF del usuario.',
      userId: '456',
    };

    this.uploadSubscription = this.fileUploadService
      .uploadFile(this.selectedFile, extraData)
      .subscribe({
        next: (event: number | string) => {
          if (typeof event === 'number') {
            this.uploadProgress = event;
          } else if (
            typeof event === 'string' &&
            event === 'Carga completada'
          ) {
            this.uploadStatus = 'completed';
            this.snackBar.open('¡Archivo subido exitosamente!', 'Cerrar', {
              duration: 3000,
            });
            this.removeFile();
          }
        },
        error: (err) => {
          this.uploadStatus = 'error';
          console.error('Error al subir el archivo:', err);
          this.snackBar.open(
            `Error al subir: ${err.message || 'Error desconocido'}`,
            'Cerrar',
            { duration: 5000 }
          );
        },
      });
  }

  formatBytes(bytes: number, decimals: number = 2): string {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  }
}
