import { Component } from '@angular/core';
import { FormBuilder,AbstractControl } from '@angular/forms';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  profileForm = this.fb.group({
    firstName: ['',[Validators.required, Validators.minLength(4), Validators.maxLength(8)] ],
    lastName: [''],
    street: [''],
    city: [''],
    state: [''],
    zip: ['']
  });
  constructor(private fb: FormBuilder) {
    console.log(this.profileForm.value)
   }

  onSubmit() {
    // TODO: Use EventEmitter with form value
    console.warn(this.profileForm.value);
  }
  updateProfile() {
    this.profileForm.patchValue({
      firstName: 'Nancy',
      address: {
        street: '123 Drew Street'
      }
    });
  }
get f(): {[key : string]:AbstractControl}{
    return this.profileForm.controls
}

}