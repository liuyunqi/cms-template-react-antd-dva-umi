"use strict";
var _a, _b;
exports.__esModule = true;
exports.columnMini = exports.columnNormal = void 0;
var index_d_1 = require("../../components/Table/index.d");
var creator_1 = require("../../components/Table/creator");
var columns_d_1 = require("./columns.d");
// 待后期字段确认后可做统一配置管理 - (这里KEYS最好是写泛型解决类型指向enum的问题)
var originalConfMax = (creator_1.columnItemDecorator)((_a = {},
    _a[columns_d_1.keys.goodsName] = { name: '商品名称' },
    _a[columns_d_1.keys.goodsCode] = { name: '商品编码' },
    _a[columns_d_1.keys.replenishmentCount] = { name: '补货数量' },
    _a[columns_d_1.keys.replenishmentRatio] = { name: '到货数量占比' },
    _a[columns_d_1.keys.sapSatisfyCount] = { name: 'SAP满足数量' },
    _a[columns_d_1.keys.outCount] = { name: '装箱出库数' },
    _a[columns_d_1.keys.receivingCount] = {
        name: '收货量',
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
    _a[columns_d_1.keys.acceptanceCount] = { name: '验收量' },
    _a[columns_d_1.keys.differenceQuantity] = { name: '差异量' },
    _a[columns_d_1.keys.billCode] = { name: '单据编号' },
    _a[columns_d_1.keys.rowNum] = { name: '行号' },
    _a), columns_d_1.keys);
// 额外增配 （解决同一字段不同问题）
var extraConfMax = (creator_1.columnItemDecorator)((_b = {},
    _b[columns_d_1.keys.receivingCount] = { name: '收货量' },
    _b), columns_d_1.keys);
exports.columnNormal = [
    originalConfMax[columns_d_1.keys.goodsName],
    originalConfMax[columns_d_1.keys.goodsCode],
    originalConfMax[columns_d_1.keys.replenishmentCount],
    originalConfMax[columns_d_1.keys.replenishmentRatio],
    originalConfMax[columns_d_1.keys.sapSatisfyCount],
    originalConfMax[columns_d_1.keys.outCount],
    originalConfMax[columns_d_1.keys.receivingCount],
    originalConfMax[columns_d_1.keys.acceptanceCount],
    originalConfMax[columns_d_1.keys.differenceQuantity]
];
exports.columnMini = [
    originalConfMax[columns_d_1.keys.billCode],
    originalConfMax[columns_d_1.keys.rowNum],
    extraConfMax[columns_d_1.keys.receivingCount]
];
