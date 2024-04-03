
export enum ListViews {
  FIREWALL = "FIREWALL",
  ENDPOINT = "ENDPOINT",
  VULNERABILITY = "VULNERABILITY",
  MONITORING = "MONITORING",
  DATA_LEAK = "DATA_LEAK",
  WEB_SCORING = "WEB_SCORING",
  LICENSES = "LICENSES",
}

export type Pagination = Partial<{
  after: string;
  before: string;
  currentPage?: number;
}>;

export interface ListSettings<TColumn extends string = string> {
  columns?: TColumn[];
  rowNumber: number;
}

export interface PaginationState {
  after?: string;
  before?: string;
  first?: number;
  last?: number;
  currentPage?: number;
}

export interface CommentCreateForm {
  senderId: string,
  avatar: string,
  timeSince?: string,
  createdTime?: string,
  username: string,
  workspace: string,
  content: string
}

export interface ListProps<TColumns extends string = string> {
  disabled: boolean;
  pageInfo?: {
    hasNextPage: boolean;
    hasPreviousPage: boolean;
    paginationState?: PaginationState;
    totalCount?: number;
  };
  settings?: ListSettings<TColumns>;
  onNextPage: () => void;
  onPreviousPage: () => void;
  onRowClick: (id: string) => () => void;
  onUpdateListSettings?: (
    key: keyof ListSettings<TColumns>,
    value: any
  ) => void;
  onListSettingsReset?: () => void;
}

export interface ListDataProps<TColumns extends string = string> {
  disabled: boolean;
  pageInfo?: {
    hasNextPage: boolean;
    hasPreviousPage: boolean;
    paginationState?: PaginationState;
    totalCount?: number;
  };
  settings?: ListSettings<TColumns>;
  onNextPage: () => void;
  onPreviousPage: () => void;
  onUpdateListSettings?: (
    key: keyof ListSettings<TColumns>,
    value: any
  ) => void;
}

export type Sort<TSort extends string = string> = Partial<{
  asc: boolean;
  sort: TSort;
}>;