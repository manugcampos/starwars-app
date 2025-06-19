export interface Person {
  name: string;
  created: string;
  url: string;
}

export interface Planet {
  name: string;
  created: string;
  url: string;
}

export interface PaginatedResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
} 