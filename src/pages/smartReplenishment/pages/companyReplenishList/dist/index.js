"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
exports.__esModule = true;
var react_1 = require("react");
var umi_1 = require("umi");
var antd_1 = require("antd");
var index_less_1 = require("./index.less");
var template_less_1 = require("../../asset/less/template.less");
require("../../asset/less/theme.less");
var Table_1 = require("../../components/Table");
var columns_1 = require("./columns");
var creator_1 = require("../../components/Table/creator");
var RangePicker = antd_1.DatePicker.RangePicker;
var initColumn = columns_1["default"];
var TransferCargoStore = function (_a) {
    var dispatch = _a.dispatch, dataSourceList = _a.dataSourceList, props = __rest(_a, ["dispatch", "dataSourceList"]);
    var _b = react_1.useState(initColumn), columns = _b[0], setColumns = _b[1]; // 表格列项
    var _c = react_1.useState(true), tableShow = _c[0], setTableShow = _c[1]; // 表格显示
    var _d = react_1.useState(false), isModalVisible = _d[0], setIsModalVisible = _d[1]; // 销量详情modal 显示
    var ACTION_OPERATION = {
        title: '操作',
        key: 'action',
        render: function (text, record, index) {
            var setActions = [
                {
                    text: '审批',
                    condition: {
                        hide: "record.key !== '2'"
                    },
                    eventType: creator_1.enumEventType.CALLBACK,
                    eventSubstance: function (record) {
                    }
                }, {
                    text: '查看',
                    condition: {
                        hide: "record.key !== '2'"
                    },
                    eventType: creator_1.enumEventType.CALLBACK,
                    eventSubstance: function (record) {
                    }
                }
            ];
            // if 条件变更 setActions ... or use condition.
            return creator_1.ColumnRender_operationAction(text, record, index, setActions);
        }
    };
    // init running...
    react_1.useEffect(function () {
        // 首次请求表格数据
        /* dispatch({
          type: 'smarRept_TransferStore/setDataSourceList',
          payload: [...dataSourceMock]
        }) */
        dispatch({
            type: 'smarRept_companyReplenishListStore/fetchDataSourceList'
        });
    }, [1]);
    // 创建请货单
    var createrHandle = function () {
    };
    var searchHandle = function () {
    };
    var resetHandle = function () {
    };
    var dateRangePickerOnchange = function (dates, dateStrings) {
        // dateStrings 2021-09-21 ~ 2021-10-31
    };
    // 全表格事件回调捕捉函数
    var tableLLEVENTCallback = function (TYPE, data) {
        console.log(TYPE, data);
        console.log(data.e.target.value);
        console.log(data.record);
    };
    // 模态框回调
    var modalHandleConfrim = function (e) {
        setIsModalVisible(false);
    };
    return (react_1["default"].createElement("div", { className: index_less_1["default"].page },
        react_1["default"].createElement("div", { className: 'common-block common-margin-vertical common-flex-wrap', style: { marginTop: 0 } },
            react_1["default"].createElement("div", { className: 'common-row-content common-flex-item' },
                react_1["default"].createElement("div", { className: 'item-div' },
                    react_1["default"].createElement("span", { className: 'bam-label' }, "\u95E8\u5E97\uFF1A"),
                    react_1["default"].createElement("div", { className: 'bam-content' },
                        react_1["default"].createElement(antd_1.Input, { placeholder: "", style: { width: 200 } }))),
                react_1["default"].createElement("div", { className: 'item-div' },
                    react_1["default"].createElement("span", { className: 'bam-label' }, "\u521B\u5EFA\u65E5\u671F\uFF1A"),
                    react_1["default"].createElement("div", { className: 'bam-content' },
                        react_1["default"].createElement(antd_1.Space, { direction: "vertical", size: 12 },
                            react_1["default"].createElement(RangePicker, { onChange: dateRangePickerOnchange }))))),
            react_1["default"].createElement("div", { style: { width: 140 } },
                react_1["default"].createElement(antd_1.Button, { type: "primary", onClick: searchHandle, style: { marginRight: 8 } }, "\u67E5\u8BE2"),
                react_1["default"].createElement(antd_1.Button, { onClick: resetHandle, type: "default" }, "\u91CD\u7F6E"))),
        react_1["default"].createElement("div", { className: 'common-block ' + template_less_1["default"].horizontalWrapper },
            react_1["default"].createElement("div", { className: template_less_1["default"].cellWrapper },
                react_1["default"].createElement(antd_1.Button, { type: "primary", ghost: true, onClick: createrHandle }, "\u521B\u5EFA\u8BF7\u8D27\u5355")),
            react_1["default"].createElement("div", { className: template_less_1["default"].siblingsWrapper })),
        react_1["default"].createElement("div", { className: 'common-block ' + index_less_1["default"].tableBox }, tableShow &&
            react_1["default"].createElement(Table_1["default"], { dataSource: dataSourceList, columns: columns, rowKey: 'id', ALLEVENTCallback: tableLLEVENTCallback }))));
};
// connect props...
var mapStateToProps = function (ALL) {
    var smarRept_companyReplenishListStore = ALL.smarRept_companyReplenishListStore, loading = ALL.loading;
    console.log('testStore====>', ALL);
    return __assign({}, smarRept_companyReplenishListStore);
};
exports["default"] = umi_1.connect(mapStateToProps)(TransferCargoStore);
