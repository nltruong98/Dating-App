import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-test-errors',
  standalone: true,
  imports: [],
  templateUrl: './test-errors.component.html',
  styleUrl: './test-errors.component.css',
})
export class TestErrorsComponent {
  baseURL = environment.apiUrl;
  private http = inject(HttpClient);
  validationErrors: string[] = [];

  get400Error() {
    return this.http.get(this.baseURL + 'buggy/bad-request').subscribe({
      next: (response) => console.log(response),
      error: (error) => console.log(error),
    });
  }

  get401Error() {
    return this.http.get(this.baseURL + 'buggy/auth').subscribe({
      next: (response) => console.log(response),
      error: (error) => console.log(error),
    });
  }

  get404Error() {
    return this.http.get(this.baseURL + 'buggy/not-found').subscribe({
      next: (response) => console.log(response),
      error: (error) => console.log(error),
    });
  }

  get500Error() {
    return this.http.get(this.baseURL + 'buggy/server-error').subscribe({
      next: (response) => console.log(response),
      error: (error) => console.log(error),
    });
  }

  get400ValidationError() {
    return this.http.post(this.baseURL + 'Account/register', {}).subscribe({
      next: (response) => console.log(response),
      error: (error) => {
        console.log(error);
        this.validationErrors = error;
      },
    });
  }
}
