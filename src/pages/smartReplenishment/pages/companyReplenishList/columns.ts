import { ColumnsType } from 'antd/es/table';
import { ColumnsTypeMine, ColumnCustomType } from '../../components/Table/index.d';
import { columnItemDecorator } from '../../components/Table/creator';
import { keys } from './columns.d';


// 待后期字段确认后可做统一配置管理 - (这里KEYS最好是写泛型解决类型指向enum的问题)
const originalConfMax = (
  columnItemDecorator
)({
  [keys.billCode]: { name: '单据编号' },
  [keys.replenStoreName]: { name: '补货门店' },
  [keys.creatTime]: { name: '创建时间' },
  [keys.inType]: { name: '单据类型' },
  [keys.inState]: { name: '单据状态' },
  [keys.updateState]: { name: '上传状态' },
  [keys.replenVarietyTotal]: { name: '补货品种数' },
  [keys.arrivalVarietyTotal]: { name: '到货品种数' },
  [keys.replenTotal]: { name: '补货数量' },
  [keys.arrivalTotal]: { name: '到货数量' },
  [keys.replenTotalMoney]: { name: '补货总金额' },
  [keys.arrivalTotalMoney]: { name: '到货总金额' },
  [keys.creater]: { name: '创建人' }
}, keys);


const column: ColumnsTypeMine = [
  originalConfMax[keys.billCode],
  originalConfMax[keys.replenStoreName],
  originalConfMax[keys.creater],
  originalConfMax[keys.creatTime],
  originalConfMax[keys.inType],
  originalConfMax[keys.inState],
  originalConfMax[keys.updateState],
  originalConfMax[keys.replenVarietyTotal],
  originalConfMax[keys.arrivalVarietyTotal],
  originalConfMax[keys.replenTotal],
  originalConfMax[keys.arrivalTotal],
  originalConfMax[keys.replenTotalMoney],
  originalConfMax[keys.arrivalTotalMoney]
];

export default column;

