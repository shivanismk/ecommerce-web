import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: any, filterString: any) {
    if (value.length === 0 || filterString == '') {
      return value;
    }
   const productList = [];
   for( const key of value){
    if (key['pname'] === filterString || key['price'] == filterString || key['rating'] == filterString) {
      productList.push(key)
    }
   }
   return productList;
  }

}
