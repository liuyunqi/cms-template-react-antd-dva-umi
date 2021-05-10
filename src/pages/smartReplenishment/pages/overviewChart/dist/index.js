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
var index_less_1 = require("./index.less");
var template_less_1 = require("../../asset/less/template.less");
require("../../asset/less/theme.less");
var echart_1 = require("../../components/echart");
var temp_1 = require("../../components/echart/temp");
var TransferCargoStore = function (_a) {
    var dispatch = _a.dispatch, dataSourceList = _a.dataSourceList, props = __rest(_a, ["dispatch", "dataSourceList"]);
    var _b = react_1.useState(false), isShowChart = _b[0], setIsShowChart = _b[1];
    var chartDatas1 = [
        { value: 1048, name: '行政赠品' },
        { value: 735, name: '创新品类' },
        { value: 580, name: '中药' },
        { value: 484, name: '中西成药' }
    ];
    var chartDatas2 = [
        { value: 1048, name: '营销' },
        { value: 735, name: '非营销' }
    ];
    // init running...
    react_1.useEffect(function () {
        setIsShowChart(true);
    }, [1]);
    return (react_1["default"].createElement("div", { className: index_less_1["default"].page },
        react_1["default"].createElement("div", { className: 'common-block ' + template_less_1["default"].horizontalWrapper, style: { marginBottom: 10 } },
            react_1["default"].createElement("div", { className: template_less_1["default"].cellWrapper },
                react_1["default"].createElement("div", null,
                    react_1["default"].createElement("h3", { style: { fontSize: 18, fontWeight: 600 } }, "\u672C\u6B21\u8865\u8D27\u6982\u89C8")),
                react_1["default"].createElement("div", null,
                    react_1["default"].createElement("div", { className: template_less_1["default"].cellItem },
                        "\u603B\u54C1\u79CD\u6570\uFF1A",
                        react_1["default"].createElement("span", null, "7")),
                    react_1["default"].createElement("div", { className: template_less_1["default"].cellItem },
                        "\u603B\u5546\u54C1\u6570\uFF1A",
                        react_1["default"].createElement("span", null, "7")),
                    react_1["default"].createElement("div", { className: template_less_1["default"].cellItem },
                        "\u603B\u5546\u54C1\u91D1\u989D\uFF1A",
                        react_1["default"].createElement("span", null, "16")),
                    react_1["default"].createElement("div", { className: template_less_1["default"].cellItem },
                        "\u6548\u671F\u5546\u54C1\u54C1\u79CD\u6570\uFF1A",
                        react_1["default"].createElement("span", null, "16")),
                    react_1["default"].createElement("div", { className: template_less_1["default"].cellItem },
                        "\u4FC3\u9500\u5546\u54C1\u54C1\u79CD\u6570\uFF1A",
                        react_1["default"].createElement("span", null, "245"),
                        "\u5143"),
                    react_1["default"].createElement("div", { className: template_less_1["default"].cellItem },
                        "\u51B7\u54C1\u54C1\u79CD\u6570\uFF1A",
                        react_1["default"].createElement("span", null, "245"),
                        "\u5143"))),
            react_1["default"].createElement("div", { className: template_less_1["default"].siblingsWrapper })),
        react_1["default"].createElement("div", { className: 'common-block ' + index_less_1["default"].chartWrapper },
            react_1["default"].createElement("div", { className: index_less_1["default"].item }, isShowChart && react_1["default"].createElement(echart_1["default"], { setOptions: temp_1.amphitheatre('各品类品种数占比', chartDatas1, {}), setStyle: { width: 400, height: 400 } })),
            react_1["default"].createElement("div", { className: index_less_1["default"].item }, isShowChart && react_1["default"].createElement(echart_1["default"], { elementId: "chartCreater2", setOptions: temp_1.amphitheatre('采购分类补货金额占比', chartDatas2, {}), setStyle: { width: 400, height: 400 } })))));
};
// connect props...
var mapStateToProps = function (ALL) {
    var smarRept_overviewModelStore = ALL.smarRept_overviewModelStore, loading = ALL.loading;
    return __assign({}, smarRept_overviewModelStore);
};
exports["default"] = umi_1.connect(mapStateToProps)(TransferCargoStore);
