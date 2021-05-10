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
var invoicesStateBarBlock_1 = require("../../components/invoicesStateBarBlock");
var TransferCargoStore = function (_a) {
    var dispatch = _a.dispatch, dataSourceList = _a.dataSourceList, props = __rest(_a, ["dispatch", "dataSourceList"]);
    var _b = react_1.useState(true), tableShow = _b[0], setTableShow = _b[1]; // 表格显示
    var _c = react_1.useState(false), isModalVisible = _c[0], setIsModalVisible = _c[1]; // 销量详情modal 显示
    var columns = columns_1["default"];
    // init running...
    react_1.useEffect(function () {
        dispatch({
            type: 'smarRept_invoicesDetails/fetchDataSourceList'
        });
    }, [1]);
    var searchHandle = function () {
    };
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
    // 查看概览
    var seeInfoPanelHandle = function () {
    };
    // 表格Props
    var setTableProps = {
        dataSource: dataSourceList,
        columns: columns,
        rowKey: 'id',
        ALLEVENTCallback: tableLLEVENTCallback
    };
    var setInStateBarBlock = {
        state: invoicesStateBarBlock_1.STATE.REJECT,
        operator: '王德发',
        operaTime: '2020-09-21',
        rejectDesc: '维生素E含量不符合超标'
    };
    var render = function () {
        var datas = [
            { key: 'a', name: '历史同比销量', value: 16 },
            { key: 'b', name: '上个补货周期环比销量', value: 123 },
            { key: 'c', name: '前15天销量', value: 46 },
            { key: 'd', name: '前30天销量', value: 132 }
        ];
        return (datas && datas.map(function (_a) {
            var name = _a.name, value = _a.value, key = _a.key;
            return (react_1["default"].createElement("div", { className: 'common-cell-row ' + template_less_1["default"].mItem, key: key },
                react_1["default"].createElement("span", { className: 'common-cell-label ' + template_less_1["default"].mLabel },
                    name,
                    "\uFF1A"),
                react_1["default"].createElement("div", { className: 'common-cell-value ' + template_less_1["default"].mContent }, value)));
        }));
    };
    return (react_1["default"].createElement("div", { className: index_less_1["default"].page },
        react_1["default"].createElement("div", { className: 'common-block ' + template_less_1["default"].horizontalWrapper },
            react_1["default"].createElement("div", { className: template_less_1["default"].cellWrapper },
                react_1["default"].createElement("div", null,
                    react_1["default"].createElement("div", { className: template_less_1["default"].cellItem },
                        "\u8865\u8D27\u95E8\u5E97\uFF1A",
                        react_1["default"].createElement("span", null, "5024")),
                    react_1["default"].createElement("div", { className: template_less_1["default"].cellItem },
                        "\u5355\u636E\u7C7B\u578B\uFF1A",
                        react_1["default"].createElement("span", null, "\u667A\u80FD\u8865\u8D27")),
                    react_1["default"].createElement("div", { className: template_less_1["default"].cellItem },
                        "\u8865\u8D27\u54C1\u79CD\u6570\uFF1A",
                        react_1["default"].createElement("span", null, "7")),
                    react_1["default"].createElement("div", { className: template_less_1["default"].cellItem },
                        "\u8865\u8D27\u603B\u6570\uFF1A",
                        react_1["default"].createElement("span", null, "16")),
                    react_1["default"].createElement("div", { className: template_less_1["default"].cellItem },
                        "\u96F6\u552E\u91D1\u989D\u6C47\u603B\uFF1A",
                        react_1["default"].createElement("span", null, "245\u5143"))),
                react_1["default"].createElement("div", { style: { marginTop: 10 } },
                    react_1["default"].createElement(invoicesStateBarBlock_1["default"], { datas: setInStateBarBlock }))),
            react_1["default"].createElement("div", { className: template_less_1["default"].siblingsWrapper },
                react_1["default"].createElement(antd_1.Button, { type: "primary", ghost: true, onClick: seeInfoPanelHandle }, "\u67E5\u770B\u6982\u89C8"))),
        react_1["default"].createElement("div", { className: 'common-block common-margin-vertical common-flex-wrap' },
            react_1["default"].createElement("div", { className: 'common-row-content common-flex-item' },
                react_1["default"].createElement("div", { className: 'item-div' },
                    react_1["default"].createElement("span", { className: 'bam-label' }, "\u5546\u54C1\uFF1A"),
                    react_1["default"].createElement("div", { className: 'bam-content' },
                        react_1["default"].createElement(antd_1.Input, { placeholder: "", style: { width: 200 } }))),
                react_1["default"].createElement("div", { className: 'item-div' },
                    react_1["default"].createElement(antd_1.Button, { type: "primary", onClick: searchHandle, style: { marginRight: 8 } }, "\u67E5\u8BE2")))),
        react_1["default"].createElement("div", { className: 'common-block ' + index_less_1["default"].tableBox }, tableShow &&
            react_1["default"].createElement(Table_1["default"], __assign({}, setTableProps))),
        react_1["default"].createElement("div", { className: 'common-block ' + index_less_1["default"].footerWrapper },
            react_1["default"].createElement(antd_1.Button, null, "\u8FD4\u56DE\u5217\u8868")),
        react_1["default"].createElement(antd_1.Modal, { title: "\u9500\u552E\u8BE6\u60C5", visible: isModalVisible, onCancel: function () { setIsModalVisible(false); }, footer: [
                react_1["default"].createElement(antd_1.Button, { key: "back", onClick: function (e) { return modalHandleConfrim('CANCEL', e); } }, "\u5173\u95ED")
            ] },
            react_1["default"].createElement("div", { className: template_less_1["default"].modalWrapper },
                react_1["default"].createElement("div", { className: 'common-cell-row ' + template_less_1["default"].item },
                    react_1["default"].createElement("span", { className: 'common-cell-label ' + template_less_1["default"].label }, "\u5546\u54C1\u540D\u79F0\uFF1A"),
                    react_1["default"].createElement("div", { className: 'common-cell-value' }, '维生素D滴剂 400单位*12粒 悦而 青岛双鲸药业有限公司')),
                react_1["default"].createElement("div", { className: 'common-cell-row ' + template_less_1["default"].item },
                    react_1["default"].createElement("span", { className: 'common-cell-label ' + template_less_1["default"].label }, "\u8865\u8D27\u65F6\u95F4\uFF1A"),
                    react_1["default"].createElement("div", { className: 'common-cell-value' }, '2020/06/18-2020/06/23')),
                react_1["default"].createElement("div", { className: 'common-cell-row ' + template_less_1["default"].item },
                    react_1["default"].createElement("span", { className: 'common-cell-label ' + template_less_1["default"].label }, "\u8865\u8D27\u5468\u671F\u603B\u9500\u91CF\u9884\u4F30\uFF1A"),
                    react_1["default"].createElement("div", { className: 'common-cell-value' }, '1225')),
                react_1["default"].createElement("div", { className: 'common-cell-row ' + template_less_1["default"].item },
                    react_1["default"].createElement("span", { className: 'common-cell-label ' + template_less_1["default"].label }, "\u53C2\u8003\u9500\u91CF\uFF1A"),
                    react_1["default"].createElement("div", { className: 'common-cell-value ' + template_less_1["default"].miniTable }, render()))))));
};
// connect props...
var mapStateToProps = function (ALL) {
    var smarRept_invoicesDetails = ALL.smarRept_invoicesDetails, loading = ALL.loading;
    console.log('testStore====>', ALL);
    return __assign({}, smarRept_invoicesDetails);
};
exports["default"] = umi_1.connect(mapStateToProps)(TransferCargoStore);
