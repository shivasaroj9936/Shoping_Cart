import { Pipe, PipeTransform } from '@angular/core';
import { FormArray } from '@angular/forms';

@Pipe({
  name: 'formPipe',
  pure: false,
})
export class FormPipePipe implements PipeTransform {
  transform(form: any, formControl: string) {
    // console.log(form.constructor.name, 'form', formControl);

    switch (form.constructor.name) {
      case 'FormGroup': {
        return form.controls[formControl].value;
      }
      case 'FormControl': {
        return form.value;
      }
      case 'Object': {
        return form[formControl];
      }
      case 'FormArray': {
        console.log(form, 'FormArray');
        return this.controlInFormArray(form, formControl, 0,form.length);
      }

      default:
        break;
    }

    return null;
  }

  controlInFormArray(form: FormArray,searchValue: string,start: number,end:number ):any {
    if(start==end)
       return null;
    else{
       console.log(form.at(start).get(searchValue)?.value);
       this.controlInFormArray(form,searchValue,start+1,end);
       return form.at(start).get(searchValue)?.value;
    }
  }
}
