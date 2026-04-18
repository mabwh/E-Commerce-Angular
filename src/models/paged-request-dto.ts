export interface PagedRequestDto {
  pageNumber: number;
  pageSize: number;
  searchTerm?: string | null;
  sortColumn?: string | null;
  sortDirection?: string | null;
}
