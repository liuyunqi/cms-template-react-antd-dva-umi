"use strict";
var _a;
exports.__esModule = true;
exports.column_FINISHED = exports.column_UNFINISHED = void 0;
var creator_1 = require("../../components/Table/creator");
var columns_d_1 = require("./columns.d");
// 待后期字段确认后可做统一配置管理 - (这里KEYS最好是写泛型解决类型指向enum的问题)
var originalConfMax = (creator_1.columnItemDecorator)((_a = {},
    _a[columns_d_1.keys.inCode] = { name: '单据编号' },
    _a[columns_d_1.keys.storeName] = { name: '门店名称' },
    _a[columns_d_1.keys.inType] = { name: '单据类型' },
    _a[columns_d_1.keys.submitter] = { name: '提交人' },
    _a[columns_d_1.keys.submitDateTime] = { name: '提交时间' },
    _a), columns_d_1.keys);
// 待审核
exports.column_UNFINISHED = [
    originalConfMax[columns_d_1.keys.inCode],
    originalConfMax[columns_d_1.keys.storeName],
    originalConfMax[columns_d_1.keys.inType],
    originalConfMax[columns_d_1.keys.submitter],
    originalConfMax[columns_d_1.keys.submitDateTime]
];
// 已审核
exports.column_FINISHED = [
    originalConfMax[columns_d_1.keys.inCode],
    originalConfMax[columns_d_1.keys.storeName],
    originalConfMax[columns_d_1.keys.inType],
    originalConfMax[columns_d_1.keys.submitter],
    originalConfMax[columns_d_1.keys.submitDateTime]
];
