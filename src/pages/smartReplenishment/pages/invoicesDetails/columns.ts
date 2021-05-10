import { ColumnsType } from 'antd/es/table';
import { ColumnsTypeMine, ColumnCustomType } from '../../components/Table/index.d';
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
  [keys.procurementState]: { name: '采购分类' },
  [keys.retailPrice]: { name: '零售价' },

  [keys.salesForecast]: {
    name: '预测销量',
    condition: [
      true,
      {
        customType: ColumnCustomType.LINKBUTTON,
        customSettings: {
          style: {
            fontWeight: 'bold'
          }
        }
      }
    ]
  },
  [keys.stockQty]: { name: '门店库存' },    // 门店库存/ 实时库存
  [keys.routeQty]: { name: '在途库存' },
  [keys.beforehandQty]: { name: '预占库存' },
  [keys.adviceCount]: { name: '建议补货数量' },
  [keys.replenishmentCount]: { name: '补货数量' },
  [keys.goodsLabel]: { name: '商品标签' }
}, keys);


const column: ColumnsType<any> = [
  originalConfMax[keys.goodsName],
  originalConfMax[keys.barCode],
  originalConfMax[keys.goodsCode],
  originalConfMax[keys.procurementDescr],

  originalConfMax[keys.procurementLv1],
  originalConfMax[keys.categroyLv1],
  originalConfMax[keys.procurementState],

  originalConfMax[keys.retailPrice],
  originalConfMax[keys.salesForecast],
  originalConfMax[keys.stockQty],
  originalConfMax[keys.routeQty],
  originalConfMax[keys.beforehandQty],
  originalConfMax[keys.adviceCount],
  originalConfMax[keys.replenishmentCount],
  originalConfMax[keys.goodsLabel],
];

export default column;


