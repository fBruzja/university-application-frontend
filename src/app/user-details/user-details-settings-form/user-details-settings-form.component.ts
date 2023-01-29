import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

export interface UserSettingsFormData {
  notifications: boolean;
}

@Component({
  selector: 'app-user-details-settings-form',
  templateUrl: './user-details-settings-form.component.html',
  styleUrls: ['./user-details-settings-form.component.scss'],
})
export class UserDetailsSettingsFormComponent implements OnInit {
  @Input()
  set formData(value: UserSettingsFormData) {
    if (value) {
      this.formGroup.patchValue(
        {
          notifications: value.notifications,
        },
        { emitEvent: false }
      );
    }
  }

  @Input()
  notificationsOn = false;

  @Output()
  settingsChanged: EventEmitter<UserSettingsFormData> =
    new EventEmitter<UserSettingsFormData>();

  formGroup = new FormGroup(
    {
      notifications: new FormControl(false),
    },
    {
      updateOn: 'blur',
    }
  );

  constructor() {}

  ngOnInit(): void {
    // saving the notification setting works with an auto-save mechanism
    this.formGroup.valueChanges.subscribe((formData) => {
      if (this.formGroup.valid) {
        this.settingsChanged.emit(formData as UserSettingsFormData);
      }
    });
  }
}
