"use strict";
var _a;
exports.__esModule = true;
var index_d_1 = require("../../components/Table/index.d");
var creator_1 = require("../../components/Table/creator");
var columns_d_1 = require("./columns.d");
// 待后期字段确认后可做统一配置管理 - (这里KEYS最好是写泛型解决类型指向enum的问题)
var originalConfMax = (creator_1.columnItemDecorator)((_a = {},
    _a[columns_d_1.keys.barCode] = { name: '商品条码' },
    _a[columns_d_1.keys.goodsCode] = { name: '商品编码' },
    _a[columns_d_1.keys.goodsName] = { name: '商品名称' },
    _a[columns_d_1.keys.procurementDescr] = { name: '采购分类说明' },
    _a[columns_d_1.keys.procurementLv1] = { name: '采购一级' },
    _a[columns_d_1.keys.categroyLv1] = { name: '品类一级' },
    _a[columns_d_1.keys.procurementState] = { name: '采购分类' },
    _a[columns_d_1.keys.retailPrice] = { name: '零售价' },
    _a[columns_d_1.keys.salesForecast] = {
        name: '预测销量',
        condition: [
            true,
            {
                customType: index_d_1.ColumnCustomType.LINKBUTTON,
                customSettings: {
                    style: {
                        fontWeight: 'bold'
                    }
                }
            }
        ]
    },
    _a[columns_d_1.keys.stockQty] = { name: '门店库存' },
    _a[columns_d_1.keys.routeQty] = { name: '在途库存' },
    _a[columns_d_1.keys.beforehandQty] = { name: '预占库存' },
    _a[columns_d_1.keys.adviceCount] = { name: '建议补货数量' },
    _a[columns_d_1.keys.replenishmentCount] = { name: '补货数量' },
    _a[columns_d_1.keys.goodsLabel] = { name: '商品标签' },
    _a), columns_d_1.keys);
var column = [
    originalConfMax[columns_d_1.keys.goodsName],
    originalConfMax[columns_d_1.keys.barCode],
    originalConfMax[columns_d_1.keys.goodsCode],
    originalConfMax[columns_d_1.keys.procurementDescr],
    originalConfMax[columns_d_1.keys.procurementLv1],
    originalConfMax[columns_d_1.keys.categroyLv1],
    originalConfMax[columns_d_1.keys.procurementState],
    originalConfMax[columns_d_1.keys.retailPrice],
    originalConfMax[columns_d_1.keys.salesForecast],
    originalConfMax[columns_d_1.keys.stockQty],
    originalConfMax[columns_d_1.keys.routeQty],
    originalConfMax[columns_d_1.keys.beforehandQty],
    originalConfMax[columns_d_1.keys.adviceCount],
    originalConfMax[columns_d_1.keys.replenishmentCount],
    originalConfMax[columns_d_1.keys.goodsLabel],
];
exports["default"] = column;
