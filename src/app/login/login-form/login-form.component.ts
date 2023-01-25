import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

export interface LoginFormData {
  email: string;
  password: string;
}

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent {

  @Input()
  set disabled(disabled: boolean) {
    if (disabled) {
      this.formGroup.disable({ emitEvent: false });
    } else {
      this.formGroup.enable({ emitEvent: false });
    }
  }

  @Output()
  loginChanged: EventEmitter<LoginFormData> = new EventEmitter<LoginFormData>();

  formGroup = new FormGroup(
    {
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    },
    {
      updateOn: 'blur',
    }
  );

  constructor() {}

  login() {
    this.loginChanged.emit(this.formGroup.value as LoginFormData);
  }
}
