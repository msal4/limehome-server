export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  hasNext: boolean;
}
