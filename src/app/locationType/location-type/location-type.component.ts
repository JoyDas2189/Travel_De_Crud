import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { LocationService } from '../../services/location.service';
import { CoreService } from '../../core/core.service';

@Component({
  selector: 'app-location-type',
  templateUrl: './location-type.component.html',
  styleUrl: './location-type.component.css',
})
export class LocationTypeComponent {
  locationForm: FormGroup;
  locationTypes: string[] = [
    'Sea Beaches',
    'Mountains',
    'Historical Places',
    'Water Falls',
    'Lakes',
  ];

  constructor(
    private _fb: FormBuilder,
    private _locationService: LocationService,
    private _dialogRef: MatDialogRef<LocationTypeComponent>,
    private _coreService: CoreService

  ) {

    this.locationForm = this._fb.group({
      type: '',
      description: '',
    });
  }
  onFormSubmit() {
    if (this.locationForm.valid) {
      this._locationService.addlocation(this.locationForm.value).subscribe({
        next: (val: any) => {
          this._coreService.openSnackBar('Location Added', 'Done');
          this._dialogRef.close(true);
        },
        error: (err: any) => {
          console.log(err);
        },
      });
    }
  }
}
