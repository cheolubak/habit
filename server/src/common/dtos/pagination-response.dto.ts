export class PaginationResponseDto<T> {
  hasNext: boolean;
  list: T[];

  constructor(hasNest: boolean, list: T[]) {
    this.hasNext = hasNest;
    this.list = list;
  }
}
