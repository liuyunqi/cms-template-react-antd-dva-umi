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
var index_d_1 = require("../../components/Table/index.d");
var TransferCargoStore = function (_a) {
    var dispatch = _a.dispatch, dataSourceList = _a.dataSourceList, props = __rest(_a, ["dispatch", "dataSourceList"]);
    var _b = react_1.useState(true), tableShow = _b[0], setTableShow = _b[1]; // 表格显示
    var _c = react_1.useState(false), isModalVisible = _c[0], setIsModalVisible = _c[1]; // 销量详情modal 显示
    /* const columnsConf = (columnItemDecorator)({
      'str1': { name: '商品名称' },
      'str2': { name: '商品编码' },
      'str3': { name: '补货数量' },
      'str4': { name: '到货数量占比' },
      'str5': { name: 'SAP满足数量' },
      'str6': { name: '装箱出库数' },
      'str7': {
        name: '收货量',
        customType: ColumnCustomType.LINKBUTTON,
        customSettings: {
          style: {
            fontWeight: 'bold'
          }
        }
      },
      'str8': { name: '验收量' },
      'str9': { name: '差异量' }
    });
  
    const columns = ((conf) => Object.keys(conf).map(key => conf[key]))(columnsConf); */
    var columns = columns_1.columnNormal;
    /* const simpleColumnsConf = (columnItemDecorator)({
      'str1': { name: '单据编号' },
      'str2': { name: '行号' },
      'str3': { name: '数量' }
    });
  
    const simpleColumns = ((conf) => Object.keys(conf).map(key => conf[key]))(simpleColumnsConf); */
    var simpleColumns = columns_1.columnMini;
    // init running...
    react_1.useEffect(function () {
        dispatch({
            type: 'smarRept_arrivalDetailsStore/fetchDataSourceList'
        });
    }, [1]);
    // 全表格事件回调捕捉函数
    var tableLLEVENTCallback = function (TYPE, data) {
        if (TYPE === index_d_1.Enum_ALLEVENT.LINKBUTTON_onClick) {
            setIsModalVisible(true);
        }
    };
    // 模态框回调
    var modalHandleConfrim = function (TYPE, e) {
        if (TYPE === 'CANCEL') {
        }
        setIsModalVisible(false);
    };
    // 表格Props
    var setTableProps = {
        dataSource: dataSourceList,
        columns: columns,
        rowKey: 'id',
        ALLEVENTCallback: tableLLEVENTCallback
    };
    // 表格Props - 简易
    var setSimpleTableProps = {
        dataSource: [dataSourceList[0]],
        columns: simpleColumns,
        rowKey: 'id',
        isShowPagination: false
    };
    return (react_1["default"].createElement("div", { className: index_less_1["default"].page },
        react_1["default"].createElement("div", { className: 'common-block ' + template_less_1["default"].horizontalWrapper, style: { marginBottom: 10 } },
            react_1["default"].createElement("div", { className: template_less_1["default"].cellWrapper },
                react_1["default"].createElement("div", null,
                    react_1["default"].createElement("div", { className: template_less_1["default"].cellItem },
                        "\u5355\u636E\u7F16\u53F7\uFF1A",
                        react_1["default"].createElement("span", null, "QHD502420210205002")),
                    react_1["default"].createElement("div", { className: template_less_1["default"].cellItem },
                        "\u63D0\u4EA4\u65F6\u95F4\uFF1A",
                        react_1["default"].createElement("span", null, "2020-09-14"))),
                react_1["default"].createElement("div", null,
                    react_1["default"].createElement("div", { className: template_less_1["default"].cellItem },
                        "\u8865\u8D27\u54C1\u79CD\u6570\uFF1A",
                        react_1["default"].createElement("span", null, "7")),
                    react_1["default"].createElement("div", { className: template_less_1["default"].cellItem },
                        "\u5230\u8D27\u54C1\u79CD\u6570\uFF1A",
                        react_1["default"].createElement("span", null, "7")),
                    react_1["default"].createElement("div", { className: template_less_1["default"].cellItem },
                        "\u8865\u8D27\u603B\u6570\uFF1A",
                        react_1["default"].createElement("span", null, "16")),
                    react_1["default"].createElement("div", { className: template_less_1["default"].cellItem },
                        "\u5230\u8D27\u603B\u6570\uFF1A",
                        react_1["default"].createElement("span", null, "16")),
                    react_1["default"].createElement("div", { className: template_less_1["default"].cellItem },
                        "\u8865\u8D27\u603B\u91D1\u989D\uFF1A",
                        react_1["default"].createElement("span", null, "245"),
                        "\u5143"),
                    react_1["default"].createElement("div", { className: template_less_1["default"].cellItem },
                        "\u8865\u8D27\u603B\u91D1\u989D\uFF1A",
                        react_1["default"].createElement("span", null, "245"),
                        "\u5143"))),
            react_1["default"].createElement("div", { className: template_less_1["default"].siblingsWrapper })),
        react_1["default"].createElement("div", { className: 'common-block ' + index_less_1["default"].tableBox }, tableShow &&
            react_1["default"].createElement(Table_1["default"], __assign({}, setTableProps))),
        react_1["default"].createElement("div", { className: 'common-block ' + index_less_1["default"].footerWrapper },
            react_1["default"].createElement(antd_1.Button, null, "\u8FD4\u56DE\u5217\u8868")),
        react_1["default"].createElement(antd_1.Modal, { title: "\u8FFD\u8E2A\u6536\u8D27", visible: isModalVisible, onCancel: function () { setIsModalVisible(false); }, footer: [
                react_1["default"].createElement(antd_1.Button, { key: "back", onClick: function (e) { return modalHandleConfrim('CANCEL', e); } }, "\u5173\u95ED")
            ] },
            react_1["default"].createElement(Table_1["default"], __assign({}, setSimpleTableProps)))));
};
// connect props...
var mapStateToProps = function (ALL) {
    var smarRept_arrivalDetailsStore = ALL.smarRept_arrivalDetailsStore, loading = ALL.loading;
    console.log('testStore====>', ALL);
    return __assign({}, smarRept_arrivalDetailsStore);
};
exports["default"] = umi_1.connect(mapStateToProps)(TransferCargoStore);
