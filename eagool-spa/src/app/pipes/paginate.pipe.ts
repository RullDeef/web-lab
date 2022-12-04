import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'paginate',
})
export class PaginatePipe implements PipeTransform {
  transform(value: any[], itemsPerPage: number, currentPage: number): any {
    const startIndex = itemsPerPage * (currentPage - 1);
    const endIndex = itemsPerPage * currentPage;
    return value.slice(startIndex, endIndex);
  }
}
