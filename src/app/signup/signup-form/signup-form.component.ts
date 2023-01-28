import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

export interface SignUpFormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  major: string;
  minor: string;
}

@Component({
  selector: 'app-signup-form',
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.scss'],
})
export class SignupFormComponent {
  @Input()
  set disabled(disabled: boolean) {
    if (disabled) {
      this.formGroup.disable({ emitEvent: false });
    } else {
      this.formGroup.enable({ emitEvent: false });
    }
  }

  @Output()
  signUpChanged: EventEmitter<SignUpFormData> =
    new EventEmitter<SignUpFormData>();

  formGroup = new FormGroup(
    {
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      major: new FormControl('', Validators.required),
      minor: new FormControl('', Validators.required)
    },
    {
      updateOn: 'blur',
    }
  );

  constructor() {}

  signUp() {
    this.signUpChanged.emit(this.formGroup.value as SignUpFormData);
  }
}
