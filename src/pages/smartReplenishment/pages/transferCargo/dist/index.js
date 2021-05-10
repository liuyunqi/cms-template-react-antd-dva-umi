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
var template_less_1 = require("../../asset/less/template.less");
require("../../asset/less/theme.less");
var Table_1 = require("../../components/Table");
var columns_1 = require("./columns");
var index_d_1 = require("../../components/Table/index.d");
var Option = antd_1.Select.Option;
var TabPane = antd_1.Tabs.TabPane;
var TabsEnum;
(function (TabsEnum) {
    TabsEnum["ALL"] = "ALL";
    TabsEnum["INDATE"] = "INDATE";
    TabsEnum["PROMOTION"] = "PROMOTION";
    TabsEnum["WANTBOOK"] = "WANTBOOK";
    TabsEnum["SUBSTITUTE"] = "SUBSTITUTE"; // 替换商品
})(TabsEnum || (TabsEnum = {}));
var tabsConf = [
    { name: '全部商品', key: TabsEnum.ALL, column: columns_1.column_ALL },
    { name: '效期商品', key: TabsEnum.INDATE, column: columns_1.column_INDATE },
    { name: '促销品', key: TabsEnum.PROMOTION, column: columns_1.column_PROMOTION },
    { name: '缺货登记', key: TabsEnum.WANTBOOK, column: columns_1.column_WANTBOOK },
    { name: '替换商品', key: TabsEnum.SUBSTITUTE, column: columns_1.column_SUBSTITUTE },
];
var initColumn = columns_1.column_ALL;
var TransferCargoStore = function (_a) {
    var dispatch = _a.dispatch, dataSourceList = _a.dataSourceList, dataSourceListMirror = _a.dataSourceListMirror, props = __rest(_a, ["dispatch", "dataSourceList", "dataSourceListMirror"]);
    var _b = react_1.useState(initColumn), columns = _b[0], setColumns = _b[1]; // 表格列项
    var _c = react_1.useState(true), tableShow = _c[0], setTableShow = _c[1]; // 表格显示
    var _d = react_1.useState(false), isModalVisible = _d[0], setIsModalVisible = _d[1]; // 销量详情modal 显示
    // init running...
    react_1.useEffect(function () {
        // 首次请求表格数据
        /* dispatch({
          type: 'smarRept_TransferStore/setDataSourceList',
          payload: [...dataSourceMock]
        }) */
        dispatch({
            type: 'smarRept_TransferStore/fetchDataSourceList'
        });
    }, [1]);
    // 商品类型 - 选中回调
    var goodsType_selectHandle = function () {
    };
    // 标签类型 - 选中回调
    var tagType_selectHandle = function () {
    };
    // 查看概览
    var seeInfoPanelHandle = function () {
    };
    var searchHandle = function () {
    };
    var resetHandle = function () {
    };
    // 选切标签卡片渲染配置
    var tabsChangeHandle = function (activeKey, e) {
        var getAction = tabsConf.filter(function (item) { return activeKey === item.key; })[0];
        setColumns(getAction.column);
    };
    // 全表格事件回调捕捉函数
    var tableLLEVENTCallback = function (TYPE, data) {
        console.log(TYPE, data);
        console.log(data.e.target.value);
        console.log(data.record);
        // 智能补货输入框 - 输出 (确保每次输入操作都能及时的写入表格数据中)
        if (TYPE === index_d_1.Enum_ALLEVENT.INPUT_onChange) {
            var e = data.e, record = data.record, columnItem = data.columnItem, index = data.index;
            var key = columnItem.key;
            var value = e.target.value;
            var getDataSource = dataSourceList.filter(function (item) { return true; });
            getDataSource[index][key] = value;
            dispatch({
                type: 'smarRept_TransferStore/setDataSourceList',
                payload: __spreadArrays(getDataSource, [])
            });
        }
        // 智能补货输入框 - 确认
        else if (TYPE === index_d_1.Enum_ALLEVENT.INPUT_onPressEnter || TYPE === index_d_1.Enum_ALLEVENT.INPUT_onBlur) {
            // fined [record.key] forEach match item. after valitor & dispatch dataResult.
            var e = data.e, record = data.record, columnItem = data.columnItem, index = data.index;
            var key = columnItem.key;
            var value = e.target.value;
            // 模拟假设条件不符 - 某次输入的条件不符合标准 (条件不满足时还原数据)
            // 比如输入的字符类型不符合，比如数值超过max....
            // 与产品(肖杨)谈好，每次操作失焦提交一次。成功与否都将刷新全表数据
            var NAN = isNaN(value);
            if (NAN) {
                // data reset
                dispatch({
                    type: 'smarRept_TransferStore/setDataSourceList',
                    payload: __spreadArrays(dataSourceListMirror, [])
                });
                // setColumns(column_ALL);
                // setTableShow(false);
                // setTableShow(true);
            }
            else {
                // 发送请求，提交修改参数
                antd_1.message.success('修改成功！');
            }
        }
        // 点击 预测销量
        else if (TYPE === index_d_1.Enum_ALLEVENT.LINKBUTTON_onClick) {
            setIsModalVisible(true);
        }
    };
    // 模态框回调
    var modalHandleConfrim = function (e) {
        setIsModalVisible(false);
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
                react_1["default"].createElement("div", { className: template_less_1["default"].cellItem },
                    "\u8865\u8D27\u95E8\u5E97\uFF1A",
                    react_1["default"].createElement("span", null, "5024")),
                react_1["default"].createElement("div", { className: template_less_1["default"].cellItem },
                    "\u5355\u636E\u7F16\u53F7\uFF1A",
                    react_1["default"].createElement("span", null, "QHD502420210205002")),
                react_1["default"].createElement("div", { className: template_less_1["default"].cellItem },
                    "\u8865\u8D27\u54C1\u79CD\u6570\uFF1A",
                    react_1["default"].createElement("span", null, "7")),
                react_1["default"].createElement("div", { className: template_less_1["default"].cellItem },
                    "\u8865\u8D27\u603B\u6570\uFF1A",
                    react_1["default"].createElement("span", null, "16")),
                react_1["default"].createElement("div", { className: template_less_1["default"].cellItem },
                    "\u96F6\u552E\u91D1\u989D\u6C47\u603B\uFF1A",
                    react_1["default"].createElement("span", null, "245\u5143"))),
            react_1["default"].createElement("div", { className: template_less_1["default"].siblingsWrapper },
                react_1["default"].createElement(antd_1.Button, { type: "primary", ghost: true, onClick: seeInfoPanelHandle }, "\u67E5\u770B\u6982\u89C8"))),
        react_1["default"].createElement("div", { className: 'common-block common-margin-vertical common-flex-wrap' },
            react_1["default"].createElement("div", { className: 'common-row-content common-flex-item' },
                react_1["default"].createElement("div", { className: 'item-div' },
                    react_1["default"].createElement("span", { className: 'bam-label' }, "\u5546\u54C1\uFF1A"),
                    react_1["default"].createElement("div", { className: 'bam-content' },
                        react_1["default"].createElement(antd_1.Input, { placeholder: "", style: { width: 200 } }))),
                react_1["default"].createElement("div", { className: 'item-div' },
                    react_1["default"].createElement("span", { className: 'bam-label' }, "\u5546\u54C1\u54C1\u7C7B\uFF1A"),
                    react_1["default"].createElement("div", { className: 'bam-content' },
                        react_1["default"].createElement(antd_1.Select, { defaultValue: "lucy", style: { width: 200 }, onChange: goodsType_selectHandle },
                            react_1["default"].createElement(Option, { value: "jack" }, "Jack"),
                            react_1["default"].createElement(Option, { value: "lucy" }, "Lucy"),
                            react_1["default"].createElement(Option, { value: "disabled", disabled: true }, "Disabled"),
                            react_1["default"].createElement(Option, { value: "Yiminghe" }, "yiminghe")))),
                react_1["default"].createElement("div", { className: 'item-div' },
                    react_1["default"].createElement("span", { className: 'bam-label' }, "\u6807\u7B7E\uFF1A"),
                    react_1["default"].createElement("div", { className: 'bam-content' },
                        react_1["default"].createElement(antd_1.Select, { defaultValue: "all", style: { width: 200 }, onChange: tagType_selectHandle },
                            react_1["default"].createElement(Option, { value: "all" }, "\u5168\u90E8"),
                            react_1["default"].createElement(Option, { value: "jack" }, "Jack"),
                            react_1["default"].createElement(Option, { value: "lucy" }, "Lucy"),
                            react_1["default"].createElement(Option, { value: "Yiminghe" }, "yiminghe"))))),
            react_1["default"].createElement("div", { style: { width: 140 } },
                react_1["default"].createElement(antd_1.Button, { type: "primary", onClick: searchHandle, style: { marginRight: 8 } }, "\u67E5\u8BE2"),
                react_1["default"].createElement(antd_1.Button, { onClick: resetHandle, type: "default" }, "\u91CD\u7F6E"))),
        react_1["default"].createElement("div", { className: 'common-block', style: { paddingBottom: 0 } },
            react_1["default"].createElement(antd_1.Tabs, { onTabClick: tabsChangeHandle, type: "card" }, tabsConf.map(function (item) { return (react_1["default"].createElement(TabPane, { tab: item.name, key: item.key })); }))),
        react_1["default"].createElement("div", { className: 'common-block ' + index_less_1["default"].tableBox }, tableShow &&
            react_1["default"].createElement(Table_1["default"], { dataSource: dataSourceList, columns: columns, rowKey: 'id', ALLEVENTCallback: tableLLEVENTCallback })),
        react_1["default"].createElement("div", { className: 'common-block ' + index_less_1["default"].footerWrapper },
            react_1["default"].createElement(antd_1.Button, null, "\u8FD4\u56DE\u5217\u8868"),
            react_1["default"].createElement(antd_1.Button, { type: "primary" }, "\u63D0\u4EA4\u5355\u636E")),
        react_1["default"].createElement(antd_1.Modal, { title: "\u9500\u552E\u8BE6\u60C5", visible: isModalVisible, onCancel: function () { setIsModalVisible(false); }, footer: [
                react_1["default"].createElement(antd_1.Button, { key: "back", onClick: modalHandleConfrim }, "\u5173\u95ED")
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
    var smarRept_TransferStore = ALL.smarRept_TransferStore, loading = ALL.loading;
    console.log('testStore====>', ALL);
    return __assign({}, smarRept_TransferStore);
};
exports["default"] = umi_1.connect(mapStateToProps)(TransferCargoStore);
