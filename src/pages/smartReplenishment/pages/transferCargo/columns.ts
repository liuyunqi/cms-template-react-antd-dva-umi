import { ColumnsType } from 'antd/es/table';
import { ColumnsTypeMine, ColumnCustomType } from '../../components/Table/index.d';
import { columnItemDecorator } from '../../components/Table/creator';
import { keys } from './columns.d';


// 待后期字段确认后可做统一配置管理 - (这里KEYS最好是写泛型解决类型指向enum的问题)
const originalConfMax = (
  columnItemDecorator
)({
  [keys.mainbarCode]: { name: '商品条码' },
  [keys.goodCode]: { name: '商品编码' },
  [keys.goodName]: { name: '商品名称' },
  [keys.stockQty]: { name: '库存' },
  [keys.replenishNumber]: {
    name: '补货数量',
    /* customType: ColumnCustomType.INPUT,
    optionsApi: {
      style: { width: 56 },
      maxLength: 4
    }, */

    /* condition: [
      true,
      {
        customType: ColumnCustomType.INPUT,
        optionsApi: {
          style: { width: 56 },
          maxLength: 4
        }
      },{
        customType: ColumnCustomType.NORMALRENDER
      }
    ] */


    condition: [
      'record.id !== "3"',
      {
        customType: ColumnCustomType.INPUT,
        optionsApi: {
          style: { width: 56 },
          maxLength: 4
        }
      },
      [
        false,
        {
          customType: ColumnCustomType.INPUT,
          optionsApi: {
            style: { width: 56 },
            maxLength: 4
          }
        },
        {
          customType: ColumnCustomType.NORMALRENDER,
        }
      ]
    ]
  },
  [keys.procurementTypeDescr]: { name: '采购分类说明' },
  [keys.procurementLv1]: { name: '采购一级' },
  [keys.procurementState]: { name: '采购状态' },
  [keys.procurementTypeState]: { name: '采购分类状态' },
  [keys.categroyLv1]: { name: '品类一级' },
  [keys.retailPrice]: { name: '零售价' },
  [keys.salesForecast]: {
    name: '预测销量',
    condition: [
      'record.id !== "3"',
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
  [keys.adviceCount]: { name: '建议补货数' },
  [keys.goodsLabel]: { name: '标签' },
  [keys.inputTime]: { name: '登记时间' },
  [keys.registerQty]: { name: '缺货登记数量' },
  [keys.replacedGoodName]: { name: '替换前商品名称' },
  [keys.replacedGoodCode]: { name: '替换前商品编码' },
  [keys.promnPlan]: { name: '促销计划' },
  [keys.promnType]: { name: '促销类型' },
  [keys.indateNumber]: { name: '效期数量' }

}, keys);

// 全部商品
export const column_ALL: ColumnsTypeMine = [
  originalConfMax[keys.goodName],
  originalConfMax[keys.mainbarCode],
  originalConfMax[keys.goodCode],
  originalConfMax[keys.stockQty],
  originalConfMax[keys.replenishNumber],
  // originalConfMax[keys.procurementTypeDescr],
  originalConfMax[keys.procurementLv1],
  originalConfMax[keys.procurementState],
  originalConfMax[keys.procurementTypeState],
  originalConfMax[keys.categroyLv1],
  originalConfMax[keys.retailPrice],
  originalConfMax[keys.salesForecast],
  originalConfMax[keys.adviceCount],
];

// 效期商品
export const column_INDATE: ColumnsType<any> = [
  originalConfMax[keys.goodName],
  originalConfMax[keys.mainbarCode],
  originalConfMax[keys.goodCode],
  originalConfMax[keys.stockQty],
  originalConfMax[keys.replenishNumber],
  // originalConfMax[keys.procurementTypeDescr],
  originalConfMax[keys.procurementLv1],
  originalConfMax[keys.procurementState],
  originalConfMax[keys.retailPrice],
  originalConfMax[keys.categroyLv1],
  originalConfMax[keys.salesForecast],
  originalConfMax[keys.adviceCount],
  originalConfMax[keys.indateNumber]
];


// 促销商品
export const column_PROMOTION: ColumnsType<any> = [
  originalConfMax[keys.goodName],
  originalConfMax[keys.mainbarCode],
  originalConfMax[keys.goodCode],
  // originalConfMax[keys.procurementTypeDescr],
  originalConfMax[keys.procurementLv1],
  originalConfMax[keys.procurementState],
  originalConfMax[keys.categroyLv1],
  originalConfMax[keys.retailPrice],
  originalConfMax[keys.salesForecast],
  originalConfMax[keys.adviceCount],
  originalConfMax[keys.replenishNumber],
  originalConfMax[keys.goodsLabel],
  originalConfMax[keys.promnPlan],
  originalConfMax[keys.promnType]
];


// 缺货登记
export const column_WANTBOOK: ColumnsType<any> = [
  originalConfMax[keys.goodName],
  originalConfMax[keys.mainbarCode],
  originalConfMax[keys.goodCode],
  // originalConfMax[keys.procurementTypeDescr],
  originalConfMax[keys.procurementLv1],
  originalConfMax[keys.procurementState],
  originalConfMax[keys.categroyLv1],
  originalConfMax[keys.retailPrice],
  originalConfMax[keys.salesForecast],
  originalConfMax[keys.stockQty],
  originalConfMax[keys.adviceCount],
  originalConfMax[keys.replenishNumber],
  originalConfMax[keys.inputTime],
  originalConfMax[keys.registerQty]
];


// 替换商品
export const column_SUBSTITUTE: ColumnsType<any> = [
  originalConfMax[keys.goodName],
  originalConfMax[keys.mainbarCode],
  originalConfMax[keys.goodCode],
  originalConfMax[keys.stockQty],
  originalConfMax[keys.replenishNumber],
  // originalConfMax[keys.procurementTypeDescr],
  originalConfMax[keys.procurementLv1],
  originalConfMax[keys.procurementState],
  originalConfMax[keys.procurementTypeState],
  originalConfMax[keys.categroyLv1],
  originalConfMax[keys.retailPrice],
  originalConfMax[keys.salesForecast],
  originalConfMax[keys.adviceCount],
  originalConfMax[keys.replacedGoodName],
  originalConfMax[keys.replacedGoodCode],
];

