import { ListSettings, ListViews, Pagination } from "./types";

export const DEFAULT_INITIAL_PAGINATION_DATA: Pagination = {
  after: undefined,
  before: undefined
};

export const PAGINATE_BY = 5;

export interface AppListViewSettings {
  [ListViews.FIREWALL]: ListSettings;
  [ListViews.ENDPOINT]: ListSettings;
  [ListViews.VULNERABILITY]: ListSettings;
  [ListViews.MONITORING]: ListSettings;
  [ListViews.DATA_LEAK]: ListSettings;
  [ListViews.WEB_SCORING]: ListSettings;
  [ListViews.LICENSES]: ListSettings;
}
export const defaultListSettings: AppListViewSettings = {
  [ListViews.FIREWALL]: {
    rowNumber: 5
  },
  [ListViews.ENDPOINT]: {
    rowNumber: PAGINATE_BY
  },
  [ListViews.VULNERABILITY]: {
    rowNumber: PAGINATE_BY
  },
  [ListViews.DATA_LEAK]: {
    rowNumber: PAGINATE_BY
  },
  [ListViews.WEB_SCORING]: {
    rowNumber: PAGINATE_BY
  },
  [ListViews.MONITORING]: {
    rowNumber: PAGINATE_BY
  },
  [ListViews.LICENSES]: {
    rowNumber: PAGINATE_BY
  }
};