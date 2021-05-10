"use strict";
var _a;
exports.__esModule = true;
exports.column_SUBSTITUTE = exports.column_WANTBOOK = exports.column_PROMOTION = exports.column_INDATE = exports.column_ALL = void 0;
var index_d_1 = require("../../components/Table/index.d");
var creator_1 = require("../../components/Table/creator");
var columns_d_1 = require("./columns.d");
// 待后期字段确认后可做统一配置管理 - (这里KEYS最好是写泛型解决类型指向enum的问题)
var originalConfMax = (creator_1.columnItemDecorator)((_a = {},
    _a[columns_d_1.keys.mainbarCode] = { name: '商品条码' },
    _a[columns_d_1.keys.goodCode] = { name: '商品编码' },
    _a[columns_d_1.keys.goodName] = { name: '商品名称' },
    _a[columns_d_1.keys.stockQty] = { name: '库存' },
    _a[columns_d_1.keys.replenishNumber] = {
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
                customType: index_d_1.ColumnCustomType.INPUT,
                optionsApi: {
                    style: { width: 56 },
                    maxLength: 4
                }
            },
            [
                false,
                {
                    customType: index_d_1.ColumnCustomType.INPUT,
                    optionsApi: {
                        style: { width: 56 },
                        maxLength: 4
                    }
                },
                {
                    customType: index_d_1.ColumnCustomType.NORMALRENDER
                }
            ]
        ]
    },
    _a[columns_d_1.keys.procurementTypeDescr] = { name: '采购分类说明' },
    _a[columns_d_1.keys.procurementLv1] = { name: '采购一级' },
    _a[columns_d_1.keys.procurementState] = { name: '采购状态' },
    _a[columns_d_1.keys.procurementTypeState] = { name: '采购分类状态' },
    _a[columns_d_1.keys.categroyLv1] = { name: '品类一级' },
    _a[columns_d_1.keys.retailPrice] = { name: '零售价' },
    _a[columns_d_1.keys.salesForecast] = {
        name: '预测销量',
        condition: [
            'record.id !== "3"',
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
    _a[columns_d_1.keys.adviceCount] = { name: '建议补货数' },
    _a[columns_d_1.keys.goodsLabel] = { name: '标签' },
    _a[columns_d_1.keys.inputTime] = { name: '登记时间' },
    _a[columns_d_1.keys.registerQty] = { name: '缺货登记数量' },
    _a[columns_d_1.keys.replacedGoodName] = { name: '替换前商品名称' },
    _a[columns_d_1.keys.replacedGoodCode] = { name: '替换前商品编码' },
    _a[columns_d_1.keys.promnPlan] = { name: '促销计划' },
    _a[columns_d_1.keys.promnType] = { name: '促销类型' },
    _a[columns_d_1.keys.indateNumber] = { name: '效期数量' },
    _a), columns_d_1.keys);
// 全部商品
exports.column_ALL = [
    originalConfMax[columns_d_1.keys.goodName],
    originalConfMax[columns_d_1.keys.mainbarCode],
    originalConfMax[columns_d_1.keys.goodCode],
    originalConfMax[columns_d_1.keys.stockQty],
    originalConfMax[columns_d_1.keys.replenishNumber],
    // originalConfMax[keys.procurementTypeDescr],
    originalConfMax[columns_d_1.keys.procurementLv1],
    originalConfMax[columns_d_1.keys.procurementState],
    originalConfMax[columns_d_1.keys.procurementTypeState],
    originalConfMax[columns_d_1.keys.categroyLv1],
    originalConfMax[columns_d_1.keys.retailPrice],
    originalConfMax[columns_d_1.keys.salesForecast],
    originalConfMax[columns_d_1.keys.adviceCount],
];
// 效期商品
exports.column_INDATE = [
    originalConfMax[columns_d_1.keys.goodName],
    originalConfMax[columns_d_1.keys.mainbarCode],
    originalConfMax[columns_d_1.keys.goodCode],
    originalConfMax[columns_d_1.keys.stockQty],
    originalConfMax[columns_d_1.keys.replenishNumber],
    // originalConfMax[keys.procurementTypeDescr],
    originalConfMax[columns_d_1.keys.procurementLv1],
    originalConfMax[columns_d_1.keys.procurementState],
    originalConfMax[columns_d_1.keys.retailPrice],
    originalConfMax[columns_d_1.keys.categroyLv1],
    originalConfMax[columns_d_1.keys.salesForecast],
    originalConfMax[columns_d_1.keys.adviceCount],
    originalConfMax[columns_d_1.keys.indateNumber]
];
// 促销商品
exports.column_PROMOTION = [
    originalConfMax[columns_d_1.keys.goodName],
    originalConfMax[columns_d_1.keys.mainbarCode],
    originalConfMax[columns_d_1.keys.goodCode],
    // originalConfMax[keys.procurementTypeDescr],
    originalConfMax[columns_d_1.keys.procurementLv1],
    originalConfMax[columns_d_1.keys.procurementState],
    originalConfMax[columns_d_1.keys.categroyLv1],
    originalConfMax[columns_d_1.keys.retailPrice],
    originalConfMax[columns_d_1.keys.salesForecast],
    originalConfMax[columns_d_1.keys.adviceCount],
    originalConfMax[columns_d_1.keys.replenishNumber],
    originalConfMax[columns_d_1.keys.goodsLabel],
    originalConfMax[columns_d_1.keys.promnPlan],
    originalConfMax[columns_d_1.keys.promnType]
];
// 缺货登记
exports.column_WANTBOOK = [
    originalConfMax[columns_d_1.keys.goodName],
    originalConfMax[columns_d_1.keys.mainbarCode],
    originalConfMax[columns_d_1.keys.goodCode],
    // originalConfMax[keys.procurementTypeDescr],
    originalConfMax[columns_d_1.keys.procurementLv1],
    originalConfMax[columns_d_1.keys.procurementState],
    originalConfMax[columns_d_1.keys.categroyLv1],
    originalConfMax[columns_d_1.keys.retailPrice],
    originalConfMax[columns_d_1.keys.salesForecast],
    originalConfMax[columns_d_1.keys.stockQty],
    originalConfMax[columns_d_1.keys.adviceCount],
    originalConfMax[columns_d_1.keys.replenishNumber],
    originalConfMax[columns_d_1.keys.inputTime],
    originalConfMax[columns_d_1.keys.registerQty]
];
// 替换商品
exports.column_SUBSTITUTE = [
    originalConfMax[columns_d_1.keys.goodName],
    originalConfMax[columns_d_1.keys.mainbarCode],
    originalConfMax[columns_d_1.keys.goodCode],
    originalConfMax[columns_d_1.keys.stockQty],
    originalConfMax[columns_d_1.keys.replenishNumber],
    // originalConfMax[keys.procurementTypeDescr],
    originalConfMax[columns_d_1.keys.procurementLv1],
    originalConfMax[columns_d_1.keys.procurementState],
    originalConfMax[columns_d_1.keys.procurementTypeState],
    originalConfMax[columns_d_1.keys.categroyLv1],
    originalConfMax[columns_d_1.keys.retailPrice],
    originalConfMax[columns_d_1.keys.salesForecast],
    originalConfMax[columns_d_1.keys.adviceCount],
    originalConfMax[columns_d_1.keys.replacedGoodName],
    originalConfMax[columns_d_1.keys.replacedGoodCode],
];
