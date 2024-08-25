export interface IPagination<T> {
  items: T[];
  limit: number;
  page: number;
  totalPages: number;
  totalCount: number;
}
