import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'datatableValueTransformer',
})
export class DatatableValueTransformerPipe implements PipeTransform {
  transform(value: string | number | boolean): string | number {
    if(typeof value === "boolean") {
      return value ? "Yes" : "No";
    }
    return value || ' - ';
  }
}
