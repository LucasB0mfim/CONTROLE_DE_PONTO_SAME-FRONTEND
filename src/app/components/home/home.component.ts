import { Component, inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HomeService } from '../../services/home.service.js';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-home',
  imports: [ReactiveFormsModule, MatProgressSpinnerModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  private readonly _homeService = inject(HomeService);
  selectedFile: File | null = null;
  isLoading: boolean = false;
  invalidFileMessage: boolean = false;
  nullFileMessage: boolean = false;

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
    }
  }

  onHome() {
    if (!this.selectedFile) {
      console.log('Nenhum arquivo selecionado.');
      this.nullFileMessage = true;
      return;
    }

    this.invalidFileMessage = false;
    this.nullFileMessage = false;
    this.isLoading = true;

    const formData = new FormData();
    formData.append('file', this.selectedFile);

    this._homeService.home(formData).subscribe({
      next: () => {
        this.isLoading = false;
        console.log('Arquivo convertido com sucesso!');
      },
      error: () => {
        this.isLoading = false;
        this.invalidFileMessage = true;
        this.selectedFile = null;
        console.error('Arquivo inválido! Selecione um arquivo .docx');
      }
    });
  }
}
