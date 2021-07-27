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
var ICONS_NEXTDAY = require('../../asset/img/icon-panel-car.png');
var ICONS_MONTHMEET = require('../../asset/img/icon-panel-chart.png');
var ICONS_TURNOVERDAY = require('../../asset/img/icon-panel-aricReset.png');
var InfoPanelStore = function (_a) {
    var datas = _a.datas, dispatch = _a.dispatch, props = __rest(_a, ["datas", "dispatch"]);
    // 显示图标
    var getIconPath = function (KEY) {
        var path = '';
        switch (KEY) {
            case 'NEXTDAY':
                path = ICONS_NEXTDAY;
                break;
            case 'MONTHMEET':
                path = ICONS_MONTHMEET;
                break;
            case 'TURNOVERDAY':
            default:
                path = ICONS_TURNOVERDAY;
        }
        return path;
    };
    // 看板统计 - 渲染构造
    var DOM_totalPanel = function (datas) {
        var items = Object.keys(datas);
        return items.map(function (key, index) { return DOM_totalPanelItem(__assign({ index: index }, datas[key]), key); });
    };
    // 看板统计 - item
    var DOM_totalPanelItem = function (_a, key) {
        var name = _a.name, value = _a.value, index = _a.index, icon = _a.icon;
        return react_1["default"].createElement("div", { className: index_less_1["default"].item, key: index },
            react_1["default"].createElement("div", { className: index_less_1["default"].itemIns },
                react_1["default"].createElement("div", { className: index_less_1["default"].itemLeft },
                    react_1["default"].createElement("div", { className: index_less_1["default"].icon },
                        react_1["default"].createElement("img", { src: icon ? icon : getIconPath(key) }))),
                react_1["default"].createElement("div", { className: index_less_1["default"].itemRight },
                    react_1["default"].createElement("span", { className: index_less_1["default"].name }, name),
                    react_1["default"].createElement("span", { className: index_less_1["default"].value }, (value || parseInt(value) === 0) ? value : '-'))));
    };
    return (react_1["default"].createElement("div", { className: index_less_1["default"].wrapper }, DOM_totalPanel(datas)));
};
// connect props...
var mapStateToProps = function (ALL) {
    var loading = ALL.loading;
    return __assign({}, loading);
};
exports["default"] = umi_1.connect(mapStateToProps)(InfoPanelStore);
