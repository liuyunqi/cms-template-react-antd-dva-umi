// 请确保此处与真实字段完全匹配
export enum keys {
  billCode = 'billCode',            // 单据编号
  replenStoreName = 'replenStoreName',    // 补货门店
  creatTime = 'creatTime',          // 创建时间
  inType = 'inType',                // 单据类型
  inState = 'inState',              // 单据状态
  updateState = 'updateState',      // 上传状态
  replenVarietyTotal = 'replenVarietyTotal',    // 补货品种数
  arrivalVarietyTotal = 'arrivalVarietyTotal',  // 到货品种数
  replenTotal = 'replenTotal',      // 补货数量
  arrivalTotal = 'arrivalTotal',    // 到货数量
  replenTotalMoney = 'replenTotalMoney', // 补货总金额
  arrivalTotalMoney = 'arrivalTotalMoney',        // 到货总金额

  creater = 'creater'               // 创建人
}

// 单据编号、补货门店、创建时间、单据类型、单据状态、补货品种数、到货品种数、补货数量、到货数量、补货总金额、到货总金额