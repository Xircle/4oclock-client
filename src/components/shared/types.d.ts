export interface CoreOutput {
  ok: boolean;
  error?: string;
}
export interface MetaTag {
  totalItems: number;
  totalPages: number;
  currentPage: number;
  hasMore: boolean;
}
