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
exports.STATE = void 0;
var react_1 = require("react");
var umi_1 = require("umi");
var index_less_1 = require("./index.less");
var STATE;
(function (STATE) {
    STATE[STATE["PASS"] = 0] = "PASS";
    STATE[STATE["REJECT"] = 1] = "REJECT";
})(STATE = exports.STATE || (exports.STATE = {}));
var InfoPanelStore = function (_a) {
    var dispatch = _a.dispatch, datas = _a.datas, props = __rest(_a, ["dispatch", "datas"]);
    return (react_1["default"].createElement("div", { className: index_less_1["default"].invoicesStateBarBlock + " " + index_less_1["default"].actionIsReject },
        react_1["default"].createElement("span", { className: index_less_1["default"].stateName }, datas.state === STATE.REJECT ? '驳回' : '通过'),
        react_1["default"].createElement("div", { className: index_less_1["default"].content },
            react_1["default"].createElement("div", { className: index_less_1["default"].item },
                "\u5BA1\u6279\u4EBA\uFF1A",
                react_1["default"].createElement("span", null, datas.operator)),
            react_1["default"].createElement("div", { className: index_less_1["default"].item },
                "\u64CD\u4F5C\u65F6\u95F4\uFF1A",
                react_1["default"].createElement("span", null, datas.operaTime)),
            datas.state === STATE.REJECT &&
                react_1["default"].createElement("div", { className: index_less_1["default"].item },
                    "\u9A73\u56DE\u539F\u56E0\uFF1A",
                    react_1["default"].createElement("span", null, datas.rejectDesc)))));
};
// connect props...
var mapStateToProps = function (ALL) {
    var loading = ALL.loading;
    return __assign({}, loading);
};
exports["default"] = umi_1.connect(mapStateToProps)(InfoPanelStore);
