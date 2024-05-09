import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CoreService } from '../../core/core.service';
import { LocationService } from '../../services/location.service';
import { LocationTypeComponent } from '../location-type/location-type.component';

@Component({
  selector: 'app-add-location-type',
  templateUrl: './add-location-type.component.html',
  styleUrl: './add-location-type.component.css',
})
export class AddLocationTypeComponent implements OnInit {
  displayedColumns: string[] = ['id', 'type', 'description', 'action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private _dialog: MatDialog,
    private _locationService: LocationService,
    private _coreService: CoreService
  ) {}

  ngOnInit() {
    this.getLocationList();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  getLocationList() {
    debugger;
    this._locationService.getLocationList().subscribe({
      next: (res) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }
  openLocationTypeForm() {
    const dialogRef = this._dialog.open(LocationTypeComponent);
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getLocationList();
        }
      },
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  deleteLocation(id: number) {
    this._locationService.deleteLocation(id).subscribe({
      next: (res) => {
        this._coreService.openSnackBar('Employee Deleted Successfully', 'Done');
        this.getLocationList();
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }
}
