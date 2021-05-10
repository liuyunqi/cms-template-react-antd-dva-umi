/**
 * Nested state
 */
export type NestedState = {
  titleMap: NestedTitleMap[];
  activeTitle: string;
};

/**
 * 标题集合类型
 * @param title 标题
 * @param url 地址
 */
interface NestedTitleMap {
  title: string;
  url: string;
}
