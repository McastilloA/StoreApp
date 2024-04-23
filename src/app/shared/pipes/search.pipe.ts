import { Pipe, type PipeTransform } from '@angular/core';
import { Products } from '@core/interface/products';

@Pipe({
  name: 'search',
  standalone: true,
})
export class SearchPipe implements PipeTransform {
  transform(
    data: any[],
    filterProperty: string,
    filter: string
  ): Array<Products> {
    console.log('Here', data);

    const filterValue = filter.toLowerCase();
    return filterValue
      ? data.filter((item) =>
          item[filterProperty].toLowerCase().includes(filterValue)
        )
      : data;
  }
}
