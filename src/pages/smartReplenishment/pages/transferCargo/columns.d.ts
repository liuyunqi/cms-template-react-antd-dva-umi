// 请确保此处与真实字段完全匹配
export enum keys {
  mainbarCode = 'mainbarCode',      // 商品条码?
  goodCode = 'goodCode',            // 商品条码
  goodName = 'goodName',            // 商品名称
  stockQty = 'stockQty',            // 库存数量
  replenishNumber = 'replenishNumber',  // 补货数量?
  procurementTypeDescr = 'procurementTypeDescr',  // 采购分类说明?
  procurementTypeState = 'procurementTypeState',  // 采购分类状态?
  procurementLv1 = 'procurementLv1',  // 采购一级
  procurementState = 'procurementState',    // 采购状态
  categroyLv1 = 'categroyLv1',      // 品类一级
  retailPrice = 'retailPrice',      // 零售价
  salesForecast = 'salesForecast',  // 预测销量
  adviceCount = 'adviceCount',      // 建议数量
  goodsLabel = 'goodsLabel',        // 标签
  inputTime = 'inputTime',          // 登记时间
  registerQty = 'registerQty',      // 缺货登记数量
  replacedGoodName = 'replacedGoodName',  // 替换前商品名称?
  replacedGoodCode = 'replacedGoodCode',  // 替换前商品编码
  promnPlan = 'promnPlan',          // 促销计划 (多则,逗号字符分割)
  promnType = 'promnType',          // 促销类型 (多则,逗号字符分割)
  indateNumber = 'indateNumber'     // 效期数量
}