import { ColumnsType } from 'antd/es/table';
import { ColumnsTypeMine, ColumnCustomType } from '../../components/Table/index.d';
import { columnItemDecorator } from '../../components/Table/creator';
import { keys } from './columns.d';


// 待后期字段确认后可做统一配置管理 - (这里KEYS最好是写泛型解决类型指向enum的问题)
const originalConfMax = (
  columnItemDecorator
)({
  [keys.inCode]: { name: '单据编号' },
  [keys.storeName]: { name: '门店名称' },
  [keys.inType]: { name: '单据类型' },
  [keys.submitter]: { name: '提交人' },
  [keys.submitDateTime]: { name: '提交时间' }
}, keys);

// 待审核
export const column_UNFINISHED: ColumnsTypeMine = [
  originalConfMax[keys.inCode],
  originalConfMax[keys.storeName],
  originalConfMax[keys.inType],
  originalConfMax[keys.submitter],
  originalConfMax[keys.submitDateTime]
];

// 已审核
export const column_FINISHED: ColumnsType<any> = [
  originalConfMax[keys.inCode],
  originalConfMax[keys.storeName],
  originalConfMax[keys.inType],
  originalConfMax[keys.submitter],
  originalConfMax[keys.submitDateTime]
];


