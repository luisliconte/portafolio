import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { IBooks } from '../../models/books.interface';
import { MatNativeDateModule } from '@angular/material/core';

@Component({
  selector: 'app-registro',
  standalone: true,
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.scss',
  imports: [
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,
    MatDialogModule,
    MatNativeDateModule]
})
export class RegistroComponent implements OnInit {
  public bookForm!: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<RegistroComponent>,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: IBooks) { }

  ngOnInit(): void {
    this.initForm();
    this.editBook(this.data);
  }

  initForm() {
    this.bookForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      originalTitle: ['', [Validators.required, Validators.minLength(3)]],
      releaseDate: ['', Validators.required],
      description: ['', [Validators.required, Validators.minLength(10)]],
      pages: [null, [Validators.required, Validators.min(1)]],
      cover: ['', [Validators.required]],
    });
  }

  get f() { return this.bookForm.controls; }

  onNoClick(): void {
    this.dialogRef.close();
  }

  editBook(book: IBooks) {
    this.bookForm.patchValue(book);
  }

}
