import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-home',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  rooms: any[] = [];
  roomForm: FormGroup;
  private _baseUrl: string = 'http://api-document-management.evericks.com/';

  // Dependency Injection
  constructor(
    private readonly _httpClient: HttpClient,
    private readonly _formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.getRooms();
    this.initRoomForm();
  }

  initRoomForm() {
    this.roomForm = this._formBuilder.group({
      name: ['null', [Validators.required]],
    });
  }

  onSubmit() {
    if (this.roomForm.valid) {
      console.log(this.roomForm.value);
      this._httpClient
        .post<any>(this._baseUrl + 'api/rooms', this.roomForm.value)
        .subscribe((result) => {
          console.log(result);
          this.getRooms();
        });
    } else {
      console.log('form invalid');
    }
  }

  getRooms() {
    this._httpClient.get<any>(this._baseUrl + 'api/rooms').subscribe({
      error: (err) => {
        this.rooms = err.error;
      },
      next: () => {},
    });
  }

  remove(id: string) {
    this._httpClient.delete(this._baseUrl + 'api/rooms/' + id).subscribe(() => {
      console.log('Deleted');
      this.getRooms();
    });
  }
}
