import { ValueConverter } from '@angular/compiler/src/render3/view/template';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'customPipe',
  pure:false
})
export class CustomPipePipe implements PipeTransform {

  transform(data: any, type: any): any {
    // console.log(data, 'data', type, 'type');

    switch (type) {

      case 'Sub-Category': {
        return data.subCatName;
      }
      case 'Class A': {
        return data.classes[0].classCount;
      }
        break;
      case 'Class B': {
        return data.classes[1].classCount;
      }
        break;

      case 'Class C': {
        return data.classes[2].classCount;
      }
        break;
      case 'Total Count': {
        return data.classes[0].classCount + data.classes[1].classCount + data.classes[2].classCount;
      }
        break;

      default:
        break;
    }
    return null;
  }

}
