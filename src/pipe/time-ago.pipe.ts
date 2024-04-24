// time-ago.pipe.ts

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeAgo'
})
export class TimeAgoPipe implements PipeTransform {

  transform(value: string): string {
    const date = new Date(value);
    const currentDate = new Date();
    const difference = currentDate.getTime() - date.getTime();
    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor(difference / (1000 * 60 * 60));
    const minutes = Math.floor(difference / (1000 * 60));
    const secondes = Math.floor(difference / (1000));
    if (days !=0) {
        return `${days}j`;
    }
    if (hours !=0) {
        return `${hours}h`;
    }
    if (minutes !=0) {
        return `${minutes}m`;
    }
    return `${secondes}s`;

    // console.log(Math.floor(difference / (1000 * 60 *60)));
  }

}
