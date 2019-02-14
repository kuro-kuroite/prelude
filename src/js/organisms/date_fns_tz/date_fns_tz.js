import { format, toDate, utcToZonedTime, zonedTimeToUtc } from 'date-fns-tz';
import { DateFnsTzInfo } from '../../atoms';

export default class DateFnsTz {
  constructor(region) {
    this.tz = new DateFnsTzInfo(region);
  }

  parseTime(utcDateTime, formatString = 'BBBB p') {
    return this.format(utcDateTime, formatString, {
      locale: this.tz.language,
      timeZone: this.tz.language.timeZone,
      awareOfUnicodeTokens: true,
    });
  }

  format(
    utcDateTime,
    formatString,
    options = {
      locale: this.tz.language,
      timeZone: this.tz.language.timeZone,
      awareOfUnicodeTokens: true,
    },
  ) {
    const localDateTime = utcToZonedTime(
      utcDateTime,
      this.tz.language.timeZone,
    );

    return format(localDateTime, formatString, options);
  }

  toDate(dateTime) {
    return toDate(dateTime, { timeZone: this.tz.language.timeZone });
  }

  zonedTimeToUtc(zonedTime) {
    return zonedTimeToUtc(zonedTime, this.tz.language.timeZone);
  }
}
