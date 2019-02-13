// TODO: 動的に追加できるようにする
import ja from 'date-fns/locale/ja';
import enUS from 'date-fns/locale/en-US';

export default class DateFnsTzInfo {
  constructor(region) {
    this.region = region;

    if (this.region === 'US') {
      this.language = enUS;
      this.language.code = 'en-US';
      this.language.timeZone = 'America/New_York';
    } else if (this.region === 'JP') {
      this.language = ja;
      this.language.code = 'ja-JP';
      this.language.timeZone = 'Asia/Tokyo';
    }
  }
}
