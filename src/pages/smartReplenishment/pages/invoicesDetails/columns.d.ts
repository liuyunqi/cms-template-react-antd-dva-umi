// 请确保此处与真实字段完全匹配
export enum keys {
  barCode = 'barCode',              // 商品条码
  goodsCode = 'goodsCode',          // 商品编码
  goodsName = 'goodsName',          // 商品名称
  procurementDescr = 'procurementDescr',  // 采购分类说明
  retailPrice = 'retailPrice',      // 零售价
  salesForecast = 'salesForecast',  // 预测销量
  stockQty = 'stockQty',            // 门店库存 / 实时库存
  adviceCount = 'adviceCount',      // 建议补货数量
  replenishmentCount = 'replenishmentCount',  // 补货数量
  goodsLabel = 'goodsLabel',        // 商品标签
  procurementLv1 = 'procurementLv1',// 采购一级
  categroyLv1 = 'categroyLv1',      // 品类一级
  procurementState = 'procurementState', // 采购状态

  routeQty = 'routeQty',            // 在途库存
  beforehandQty = 'beforehandQty'   // 预占库存
}