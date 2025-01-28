import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  private readonly _httpClient = inject(HttpClient);

  home(formData: FormData) {
    return this._httpClient.post(
      'http://localhost:3000/same-engenharia/api/automatizar/gerar-planilha',
      formData
    );
  }
}
