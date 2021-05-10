import { ColumnsTypeMine, ColumnCustomType } from '../../components/Table/index.d';
import { columnItemDecorator } from '../../components/Table/creator';
import { keys } from './columns.d';


// 待后期字段确认后可做统一配置管理 - (这里KEYS最好是写泛型解决类型指向enum的问题)
const originalConfMax = (
  columnItemDecorator
)({
  [keys.goodsName]: { name: '商品名称' },
  [keys.goodsCode]: { name: '商品编码' },
  [keys.replenishmentCount]: { name: '补货数量' },
  [keys.replenishmentRatio]: { name: '到货数量占比' },
  [keys.sapSatisfyCount]: { name: 'SAP满足数量' },

  [keys.outCount]: { name: '装箱出库数' },
  [keys.receivingCount]: {
    name: '收货量',
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
  [keys.acceptanceCount]: { name: '验收量' },
  [keys.differenceQuantity]: { name: '差异量' },

  [keys.billCode]: { name: '单据编号' },
  [keys.rowNum]: { name: '行号' }
}, keys);

// 额外增配 （解决同一字段不同问题）
const extraConfMax = (
  columnItemDecorator
)({
  [keys.receivingCount]: { name: '收货量' }
}, keys);

export const columnNormal: ColumnsTypeMine = [
  originalConfMax[keys.goodsName],
  originalConfMax[keys.goodsCode],
  originalConfMax[keys.replenishmentCount],
  originalConfMax[keys.replenishmentRatio],
  originalConfMax[keys.sapSatisfyCount],
  originalConfMax[keys.outCount],
  originalConfMax[keys.receivingCount],
  originalConfMax[keys.acceptanceCount],
  originalConfMax[keys.differenceQuantity]
];

export const columnMini: ColumnsTypeMine = [
  originalConfMax[keys.billCode],
  originalConfMax[keys.rowNum],
  extraConfMax[keys.receivingCount]
];

