/**
 * home State
 */
export type HomeState = {
  tabListMap: HomeTaleList[];
};

export interface HomeTaleList {
  label: string;
  key: string;
}
