import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Optional,
  Output,
  Self,
  ViewChild,
} from '@angular/core';
import { ControlValueAccessor, FormControl, NgControl, ValidationErrors } from '@angular/forms';
import { translateErrors } from 'src/app/translation/translation.service';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
})
export class InputComponent implements ControlValueAccessor, OnInit {
  @Input()
  autocomplete: 'on' | 'off' = 'on';

  @Input()
  label: string = '';

  @Input()
  maxlength: string | number = '';

  @Input()
  class = 'form-group-basic';

  @Input()
  suffix = '';

  @Input()
  tooltipText = '';

  @Input() type = 'text';

  @Input('readonly') set setReadonly(readonly: boolean | '') {
    this.readonly = readonly === '' || readonly;
  }

  @Output() blur: EventEmitter<any> = new EventEmitter();
  @ViewChild('input', { static: true })
  input!: ElementRef;
  formControl!: FormControl;

  readonly = false;
  required = false;

  constructor(@Self() @Optional() public ngControl: NgControl) {
    ngControl.valueAccessor = this;
  }

  ngOnInit() {
    this.formControl = this.ngControl.control as FormControl;
  }

  onChange: any = (_: any) => {};
  onTouched: any = () => {};

  registerOnChange(fn: Function) {
    this.onChange = fn;
  }

  registerOnTouched(fn: Function) {
    this.onTouched = fn;
  }

  writeValue(value: any) {
    this.input.nativeElement.value = value;
  }

  onBlur(event: any) {
    this.blur.emit(event);
    this.onTouched();
  }

  onInput(event: any) {
    this.onChange(event.target.value);
  }

  getErrorMessage(errors: ValidationErrors | null | undefined): string {
    return translateErrors(errors);
  }
}
