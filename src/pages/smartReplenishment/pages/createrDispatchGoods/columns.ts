import { ColumnsType } from 'antd/es/table';
import { columnItemDecorator } from '../../components/Table/creator';
import { keys } from './columns.d';

// 待后期字段确认后可做统一配置管理 - (这里KEYS最好是写泛型解决类型指向enum的问题)
const originalConfMax = (
  columnItemDecorator
)({
  [keys.barCode]: { name: '商品条码' },
  [keys.goodsCode]: { name: '商品编码' },
  [keys.goodsName]: { name: '商品名称' },
  [keys.procurementDescr]: { name: '采购分类说明' },
  [keys.procurementLv1]: { name: '采购一级' },
  [keys.categroyLv1]: { name: '品类一级' },
  [keys.retailPrice]: { name: '零售价' },
  [keys.ptcnStatus]: { name: '采购分类状态' },
  [keys.stockQty]: { name: '实时库存' },
  [keys.replenishmentCount]: { name: '补货数量' }
}, keys);


const column: ColumnsType<any> = [
  originalConfMax[keys.goodsName],
  originalConfMax[keys.barCode],
  originalConfMax[keys.goodsCode],
  // originalConfMax[keys.procurementDescr],
  originalConfMax[keys.procurementLv1],
  originalConfMax[keys.categroyLv1],
  originalConfMax[keys.retailPrice],
  originalConfMax[keys.ptcnStatus],
  originalConfMax[keys.stockQty],
  originalConfMax[keys.replenishmentCount]
];

export default column;


