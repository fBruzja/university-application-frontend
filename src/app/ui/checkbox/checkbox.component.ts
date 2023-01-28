import {
  Component,
  EventEmitter,
  Input,
  Optional,
  Output,
  Self,
} from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';

@Component({
  selector: 'app-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss'],
})
export class CheckboxComponent implements ControlValueAccessor {
  @Input() label: string = '';
  @Input() value: boolean = false;
  @Input() indeterminate: boolean = false;
  @Input() disabled: boolean = false;
  @Input() name: string = '';
  @Output() blur: EventEmitter<any> = new EventEmitter();
  @Output() changed: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(@Self() @Optional() public ngControl: NgControl) {
    if (ngControl) {
      ngControl.valueAccessor = this;
    }
  }

  onChange: any = (_: any) => {};

  onTouched: any = () => {};

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  writeValue(value: boolean): void {
    this.value = value;
  }

  onBlur(event: Event) {
    this.blur.emit(event);
    this.onTouched();
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  onCheckboxChanged(checked: boolean): void {
    this.onChange(checked);
    this.changed.emit(checked);
    this.onTouched();
  }
}
