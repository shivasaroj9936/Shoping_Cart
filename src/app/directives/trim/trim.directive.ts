import { Directive, ElementRef, HostListener } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[appTrim]',
})
export class TrimDirective {
  get ctrl() {
    return this.ngControl.control;
  }
  constructor(private ngControl: NgControl, private _el: ElementRef) {}
  @HostListener('focus')
  @HostListener('blur')
  onBlur() {
    if (
      this._el.nativeElement.value === null ||
      this._el.nativeElement.value === undefined ||
      this._el.nativeElement.value === ''
    ) {
      return;
    }

    this._el.nativeElement.value = this._el.nativeElement.value.trim();
    // console.log('el', this._el.nativeElement.value);

    this.ctrl?.setValue(this.ctrl.value.trim());
    // console.log(this.ctrl);
  }
}
