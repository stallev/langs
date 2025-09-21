export interface PaginationState {
  currentPage: number;
  itemsPerPage: number;
  totalItems: number;
  totalPages: number;
}

export interface FilterState {
  category: string;
}

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}
