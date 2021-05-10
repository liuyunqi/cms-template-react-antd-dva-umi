"use strict";
var _a;
exports.__esModule = true;
var creator_1 = require("../../components/Table/creator");
var columns_d_1 = require("./columns.d");
// 待后期字段确认后可做统一配置管理 - (这里KEYS最好是写泛型解决类型指向enum的问题)
var originalConfMax = (creator_1.columnItemDecorator)((_a = {},
    _a[columns_d_1.keys.billCode] = { name: '单据编号' },
    _a[columns_d_1.keys.replenStoreName] = { name: '补货门店' },
    _a[columns_d_1.keys.creatTime] = { name: '创建时间' },
    _a[columns_d_1.keys.inType] = { name: '单据类型' },
    _a[columns_d_1.keys.inState] = { name: '单据状态' },
    _a[columns_d_1.keys.updateState] = { name: '上传状态' },
    _a[columns_d_1.keys.replenVarietyTotal] = { name: '补货品种数' },
    _a[columns_d_1.keys.arrivalVarietyTotal] = { name: '到货品种数' },
    _a[columns_d_1.keys.replenTotal] = { name: '补货数量' },
    _a[columns_d_1.keys.arrivalTotal] = { name: '到货数量' },
    _a[columns_d_1.keys.replenTotalMoney] = { name: '补货总金额' },
    _a[columns_d_1.keys.arrivalTotalMoney] = { name: '到货总金额' },
    _a[columns_d_1.keys.creater] = { name: '创建人' },
    _a), columns_d_1.keys);
var column = [
    originalConfMax[columns_d_1.keys.billCode],
    originalConfMax[columns_d_1.keys.replenStoreName],
    originalConfMax[columns_d_1.keys.creater],
    originalConfMax[columns_d_1.keys.creatTime],
    originalConfMax[columns_d_1.keys.inType],
    originalConfMax[columns_d_1.keys.inState],
    originalConfMax[columns_d_1.keys.updateState],
    originalConfMax[columns_d_1.keys.replenVarietyTotal],
    originalConfMax[columns_d_1.keys.arrivalVarietyTotal],
    originalConfMax[columns_d_1.keys.replenTotal],
    originalConfMax[columns_d_1.keys.arrivalTotal],
    originalConfMax[columns_d_1.keys.replenTotalMoney],
    originalConfMax[columns_d_1.keys.arrivalTotalMoney]
];
exports["default"] = column;
