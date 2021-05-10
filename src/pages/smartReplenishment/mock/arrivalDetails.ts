
import { keys } from '../pages/arrivalDetails/columns.d';

export const mockdata_arrivalDetailsList = [
  {
    'id': '1',
    [keys.goodsName]: '维生素D滴剂 400单位*12粒 悦而 青岛双鲸药业有限公司',
    [keys.goodsCode]: '8504226',
    [keys.replenishmentCount]: 8,
    [keys.replenishmentRatio]: '98%',
    [keys.sapSatisfyCount]: 26,
    [keys.outCount]: 10,
    [keys.receivingCount]: 12,
    [keys.acceptanceCount]: 12,
    [keys.differenceQuantity]: 0,

    [keys.billCode]: 'QHD502420210205002',
    [keys.rowNum]: 1321
  },{
    'id': '2',
    [keys.goodsName]: '板蓝根颗粒 10克*30袋 广西维威制药有限公司',
    [keys.goodsCode]: '1560125',
    [keys.replenishmentCount]: 18,
    [keys.replenishmentRatio]: '94%',
    [keys.sapSatisfyCount]: 39,
    [keys.outCount]: 10,
    [keys.receivingCount]: 45,
    [keys.acceptanceCount]: 45,
    [keys.differenceQuantity]: 0,

    [keys.billCode]: 'QHD502420210205075',
    [keys.rowNum]: 986
  },{
    'id': '3',
    [keys.goodsName]: '盐酸特比萘芬片 0.25克*14片 南京臣功制药股份有限公司',
    [keys.goodsCode]: '5956266',
    [keys.replenishmentCount]: 22,
    [keys.replenishmentRatio]: '92%',
    [keys.sapSatisfyCount]: 41,
    [keys.outCount]: 10,
    [keys.receivingCount]: 124,
    [keys.acceptanceCount]: 126,
    [keys.differenceQuantity]: 2,

    [keys.billCode]: 'QHD502420210205133',
    [keys.rowNum]: 2621
  }
];


/*
  [keys.goodsName]: { name: '商品名称' },
  [keys.goodsCode]: { name: '商品编码' },
  [keys.replenishmentCount]: { name: '补货数量' },
  [keys.replenishmentRatio]: { name: '到货数量占比' },
  [keys.sapSatisfyCount]: { name: 'SAP满足数量' },

  [keys.outCount]: { name: '装箱出库数' },
  [keys.receivingCount]: { name: '收货量' },
  [keys.acceptanceCount]: { name: '验收量' },
  [keys.differenceQuantity]: { name: '差异量' }

  originalConfMax[keys.billCode],
  originalConfMax[keys.rowNum],
  originalConfMax[keys.receivingCount]
*/