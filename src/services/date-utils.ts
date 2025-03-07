import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class DateUtils {
  formatDate(date: Date): string {
    const yyyy = date.getFullYear();
    const mm = date.getMonth() + 1; // Months start at 0!
    const dd = date.getDate();

    let mmString = (date.getMonth() + 1).toString();
    let ddString = dd.toString();

    if (dd < 10) ddString = '0' + ddString;
    if (mm < 10) mmString = '0' + mmString;

    const formattedToday = yyyy + '-' + mmString + '-' + ddString;

    return formattedToday;
  }

  formatTime(date: Date): string {
    const hours = date.getHours();
    const minutes = date.getMinutes();

    return `${hours < 10 ? '0' : ''}${hours}:${
      minutes < 10 ? '0' : ''
    }${minutes}`;
  }

  generateDateFromString(date: string, time: string): Date {
    return new Date(`${date} ${time}`);
  }
}
