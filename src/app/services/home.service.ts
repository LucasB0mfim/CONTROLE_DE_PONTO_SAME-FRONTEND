import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  private readonly _httpClient = inject(HttpClient);

  home(formData: FormData) {
    return this._httpClient.post(
      'https://controledepontosame-backend-production.up.railway.app/same-engenharia/api/gerar-planilha/gerar-planilha',
      formData
    );
  }
}
