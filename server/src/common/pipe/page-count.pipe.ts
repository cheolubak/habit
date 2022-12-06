import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class PageCountPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    if (!!value) {
      return +value;
    } else {
      return 20;
    }
  }
}
