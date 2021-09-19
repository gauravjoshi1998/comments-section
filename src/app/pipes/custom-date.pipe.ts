import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'customDate'
})
export class CustomDatePipe implements PipeTransform {
  transform(value: any): string {
    value = value.toString();
    value = new Date(value)
    if (!value) {
      return '';
    }
   let months= ["Jan","Feb","Mar","Apr","May","June","July",
           "Aug","Sept","Oct","Nov","Dec"]
    return `${value.getDate()}${this.nth(value.getDate)} ${months[value.getMonth().toString()]} ${value.getFullYear()}`;
  }

 nth(d: any) {
  if (d > 3 && d < 21) return 'th'; 
  switch (d % 10) {
    case 1:  return "st";
    case 2:  return "nd";
    case 3:  return "rd";
    default: return "th";
  }
}
}