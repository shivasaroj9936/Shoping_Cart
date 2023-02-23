import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appBackgroundColor]',
})
export class BackgroundColorDirective {
  constructor(private _el: ElementRef) {}
  @HostListener('mouseover') onMouseOver() {

    this.changeBackgroundColor('lightgrey');
  }
  @HostListener('mouseleave') onMouseLeave() {
    this.changeBackgroundColor('white');
  }
  changeBackgroundColor(color: string) {

    this._el.nativeElement.style.backgroundColor = color;
  }
}
