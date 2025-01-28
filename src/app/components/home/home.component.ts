import { Component, inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HomeService } from '../../services/home.service';
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
    if (file && file.type === 'text/csv') {
      this.selectedFile = file;
      this.invalidFileMessage = false;
      this.nullFileMessage = false;
    } else {
      this.invalidFileMessage = true;
      this.selectedFile = null;
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
    formData.append('file', this.selectedFile, this.selectedFile.name);

    // Debug para verificar o formData
    console.log('Arquivo sendo enviado:', this.selectedFile);
    formData.forEach((value, key) => {
      console.log('FormData:', key, value);
    });

    this._homeService.home(formData).subscribe({
      next: (response) => {
        this.isLoading = false;
        console.log('Arquivo enviado com sucesso!', response);
        this.selectedFile = null;
      },
      error: (error) => {
        this.isLoading = false;
        this.invalidFileMessage = true;
        this.selectedFile = null;
        console.error('Erro ao enviar arquivo:', error);
      }
    });
  }
}
