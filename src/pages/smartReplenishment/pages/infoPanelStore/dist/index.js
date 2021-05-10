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
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
var react_1 = require("react");
var umi_1 = require("umi");
var antd_1 = require("antd");
var index_less_1 = require("./index.less");
require("../../asset/less/theme.less");
var InfoPanel_1 = require("../../components/InfoPanel");
var Table_1 = require("../../components/Table");
var creator_1 = require("../../components/Table/creator");
var tableMock_1 = require("../../components/Table/tableMock");
var ICONS_notice = require('../../asset/img/icon-notice-orange.png');
var dataSource = tableMock_1.dataSourceMock;
var initColumns = [
    {
        title: '单据编号',
        dataIndex: 'str1',
        key: 'str1'
    },
    {
        title: '创建时间',
        dataIndex: 'str2',
        key: 'str2'
    },
    {
        title: '创建人',
        dataIndex: 'str3',
        key: 'str3'
    },
    {
        title: '单据类别',
        dataIndex: 'str4',
        key: 'str4'
    },
    {
        title: '单据状态',
        dataIndex: 'str5',
        key: 'str5'
    },
    {
        title: '补货品种数',
        dataIndex: 'str6',
        key: 'str6'
    },
    {
        title: '补货数量',
        dataIndex: 'str7',
        key: 'str7'
    },
    {
        title: '补货总金额',
        dataIndex: 'str8',
        key: 'str8'
    }
];
var InfoPanelStore = function (_a) {
    var panelTotal = _a.panelTotal, dispatch = _a.dispatch, props = __rest(_a, ["panelTotal", "dispatch"]);
    var _b = react_1.useState(false), visible = _b[0], setVisible = _b[1]; // 弹窗显示
    var _c = react_1.useState(initColumns), columns = _c[0], setColumns = _c[1]; // 表格列项
    var ACTION_OPERATION = {
        title: '操作',
        key: 'action',
        render: function (text, record, index) {
            var setActionsTest = tableMock_1.setActionsTestMock;
            var setActions = [
                {
                    text: '编辑',
                    condition: {
                        hide: "record.key !== '2'"
                    },
                    eventType: creator_1.enumEventType.CALLBACK,
                    eventSubstance: function (record) {
                        setVisible(true);
                    }
                }, {
                    text: '提交',
                    condition: {
                        hide: "record.key !== '2'"
                    },
                    eventType: creator_1.enumEventType.CALLBACK,
                    eventSubstance: function (record) {
                        setVisible(true);
                    }
                }, {
                    text: '删除',
                    condition: {
                        hide: "record.key !== '2'"
                    },
                    eventType: creator_1.enumEventType.CALLBACK,
                    eventSubstance: function (record) {
                        setVisible(true);
                    }
                }, {
                    text: '查看明细',
                    condition: {
                        hide: "!['1','3'].includes(record.key)"
                    },
                    eventType: creator_1.enumEventType.CALLBACK,
                    eventSubstance: function (record) {
                        setVisible(true);
                    }
                }, {
                    text: '到货明细',
                    condition: {
                        hide: "!['1','3'].includes(record.key)"
                    },
                    eventType: creator_1.enumEventType.CALLBACK,
                    eventSubstance: function (record) {
                        setVisible(true);
                    }
                }, {
                    text: '流程跟踪',
                    condition: {
                        hide: "!['1','3'].includes(record.key)"
                    },
                    eventType: creator_1.enumEventType.CALLBACK,
                    eventSubstance: function (record) {
                        setVisible(true);
                    }
                }
            ];
            // if 条件变更 setActions ... or use condition.
            return creator_1.ColumnRender_operationAction(text, record, index, setActions);
        }
    };
    react_1.useEffect(function () {
        if (columns[columns.length - 1]['key'] !== 'action') {
            setColumns(function (prev) { return __spreadArrays(prev, [ACTION_OPERATION]); });
        }
    }, [1]);
    // Click 查看补货详情
    var seeDetailHandle = function () {
    };
    // Click 手动请货
    var obtainHandle = function () {
    };
    // 创建补货单 - 弹窗回调
    var modalHandle = function (TYPE, e) {
        if (TYPE === 'OK') {
        }
        else if (TYPE === 'CANCEL') {
        }
        setVisible(false);
    };
    return (react_1["default"].createElement("div", { className: index_less_1["default"].page },
        react_1["default"].createElement(InfoPanel_1["default"], { datas: panelTotal }),
        react_1["default"].createElement("div", { className: "common-block common-margin-vertical" },
            react_1["default"].createElement("img", { src: ICONS_notice }),
            react_1["default"].createElement("span", { className: index_less_1["default"].noticeText + ' text-cut-single' }, "5024\u5E97\u957F\uFF0C\u60A8\u6709\u4E00\u4E2A\u8865\u8D27\u5355\u5F85\u786E\u8BA4"),
            react_1["default"].createElement(antd_1.Button, { type: "primary", onClick: seeDetailHandle }, "\u67E5\u770B\u8865\u8D27\u8BE6\u60C5"),
            react_1["default"].createElement(antd_1.Button, { className: "floatR", type: "default", onClick: obtainHandle }, "\u624B\u52A8\u8BF7\u8D27")),
        react_1["default"].createElement("div", { className: "common-block" },
            react_1["default"].createElement(Table_1["default"], { dataSource: dataSource, columns: columns })),
        react_1["default"].createElement(antd_1.Modal, { title: "\u521B\u5EFA\u8865\u8D27\u5355", visible: visible, okText: "\u521B\u5EFA", onOk: function (e) { modalHandle('OK', e); }, onCancel: function (e) { modalHandle('CANCEL', e); } },
            react_1["default"].createElement("div", null, "\u95E8\u5E97\u8865\u8D27\uFF1A5024"),
            react_1["default"].createElement("div", null, "\u5355\u636E\u7C7B\u522B\uFF1Aselect"))));
};
// connect props...
var mapStateToProps = function (ALL) {
    var smarReptStore_infoPanelStore = ALL.smarReptStore_infoPanelStore, loading = ALL.loading;
    console.log('testStore====>', ALL);
    return __assign({}, smarReptStore_infoPanelStore);
};
exports["default"] = umi_1.connect(mapStateToProps)(InfoPanelStore);
