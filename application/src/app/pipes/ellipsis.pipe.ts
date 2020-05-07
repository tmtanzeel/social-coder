import { Pipe } from '@angular/core';
import { SlicePipe } from '@angular/common';

@Pipe({
  name: 'ellipsis'
})
export class EllipsisPipe extends SlicePipe {
  constructor () {
    super();
  }
  transform(value: string, maxLength: number): any {
    const suffix = value && value.length > maxLength ? "..." : "";
    return super.transform(value, 0, maxLength) + suffix;
  }
}