import { AfterViewInit, Component, inject, OnInit, ViewChild } from '@angular/core';
import { ProductoService } from '../../services/producto.service';
import { IBooks } from '../../models/books.interface';
import { COLUMNS_TABLE_PRODUCT } from '../../shared/config-tables/columns-table-product';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { RegistroComponent } from '../registro/registro.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';

@Component({
  selector: 'app-producto',
  standalone: true,
  templateUrl: './producto.component.html',
  styleUrl: './producto.component.scss',
  imports: [
    MatTableModule, 
    MatButtonModule, 
    MatIconModule,
    MatSortModule, 
    MatPaginatorModule, 
    MatInputModule],
})
export class ProductoComponent implements OnInit, AfterViewInit {
  readonly dialog = inject(MatDialog);
  public dataSource: MatTableDataSource<IBooks> = new MatTableDataSource<IBooks>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  public displayedColumns: string[] = COLUMNS_TABLE_PRODUCT;
  private _productoService = inject(ProductoService);



  ngOnInit(): void {
    this.getBooks();
  }

  getBooks() {
    this._productoService.getProducto().subscribe(res => {
      this.dataSource.data = res;
    });
  }

  openDialog(books: IBooks | null): void {
    const valueBook = books ? books : null;
    const dialogRef = this.dialog.open(RegistroComponent, {
      minWidth: '80%',
      maxWidth: '100%',
      height: 'auto',
      data: valueBook,
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        this.submitForm(result);
      }
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  deleteBook(book: IBooks) {
    const index = this.dataSource.data.indexOf(book);
    if (index >= 0) {
      this.dataSource.data.splice(index, 1);
      this.dataSource.data = [...this.dataSource.data];
    }
  }

  submitForm(data: IBooks) {
    if (data) {
      const index = this.dataSource.data.findIndex(book => book.number === data!.number);
      if (index !== -1) {
        this.dataSource.data[index] = data;
        this.dataSource.data = [...this.dataSource.data];
      } else {
        this.dataSource.data = [data, ...this.dataSource.data];
      }
    }
  }
}
