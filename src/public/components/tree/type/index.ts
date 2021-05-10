/**
 * props数据类型
 * @param title 弹窗的标题
 * @param storeDataSource 选择门店级别时的数据集合 当是07级别时处理门店数据，06级别默认传空数组
 * @param dataSource 已选中的数据--回显的数据
 * @param _area 片区级数据时再次打开树组件时的新增数据
 * @param selectHierarchy 选择的组织机构级别 06-片区级别 07-门店级别
 * @param staffCode 要查询的工号
 * @param storeCode 要查询的门店
 * @param disabled 是否禁用组织树
 * @param onOk 确定点击事件
 * @param onCancel 关闭弹窗事件
 */
export interface TreeProps {
  title: string;
  storeDataSource: any[];
  dataSource: string[];
  _area?: string[];
  selectHierarchy: '06' | '07';
  onOk: (data: any[]) => void;
  onCancel: () => void;
  disabled?: boolean;
  staffCode: string;
  storeCode?: string;
}

/**
 * 组织树数据类型
 * @param key
 * @param title
 * @param hierarchy
 * @param pid
 * @param disabled
 * @param children
 */
export interface treeNodesType {
  key: string;
  title: string;
  hierarchy: string;
  pid: string;
  disabled?: boolean;
  children?: treeNodesType[];
}

/**
 *
 */
export interface treeData {
  children: treeData[];
  hierarchy: string;
  key: string;
  orgCode: string;
  title: string;
  pid: string;
  value?: string;
  storeCode: string;
}

/**
 * 请求参数
 */
export interface getOrgTreeNodeByLevelType {
  levelQuery: levelQueryUserQueryListUserByOrgPostType;
}

/**
 * @param storeCode 门店编码
 * @param userCode 工号
 * @param orgCode 组织机构编码
 * @param hierarchyList 级别 （01-公司，02-中心，03-营运区，04-部门，05-组，06-片区，-07-门店）
 */
interface levelQueryUserQueryListUserByOrgPostType {
  storeCode: string;
  userCode: string;
  orgCode: string;
  hierarchyList: string[];
}
