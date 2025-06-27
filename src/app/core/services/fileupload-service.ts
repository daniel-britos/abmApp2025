import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpEventType } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class FileuploadService {
  // ¡CAMBIAR ESTO POR LA URL REAL DE TU BACKEND!
  private apiUrl = 'http://localhost:3000/api/upload-file';

  private readonly http = inject(HttpClient);

  /**
   * Sube un archivo al servidor.
   * @param file El objeto File a subir.
   * @param extraData Objeto opcional con datos adicionales para enviar junto al archivo.
   * @returns Un Observable que emite eventos de progreso y la respuesta final.
   */
  uploadFile(
    file: File,
    extraData?: { [key: string]: any }
  ): Observable<number | string> {
    const formData = new FormData();
    formData.append('file', file, file.name);

    if (extraData) {
      for (const key in extraData) {
        if (extraData.hasOwnProperty(key)) {
          formData.append(key, extraData[key]);
        }
      }
    }

    return this.http
      .post(this.apiUrl, formData, {
        reportProgress: true,
        observe: 'events',
      })
      .pipe(
        map((event) => {
          switch (event.type) {
            case HttpEventType.UploadProgress:
              const percentDone = Math.round(
                (100 * event.loaded) / (event.total || 1)
              );
              return percentDone;
            case HttpEventType.Response:
              return 'Carga completada';
            default:
              return `Evento: ${event.type}`;
          }
        })
      );
  }
}
