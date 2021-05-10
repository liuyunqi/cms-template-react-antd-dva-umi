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
var icons_1 = require("@ant-design/icons");
var index_less_1 = require("./index.less");
require("../../asset/less/theme.less");
var Table_1 = require("../../components/Table");
var columns_1 = require("./columns");
var XLSX = require("xlsx");
var mockAutoCompleteOptions = [
    { label: 'A100001 | 阿莫西林X-2', value: 'a1' },
    { label: 'A100002 | 红霉素眼膏', value: 'a2' },
    { label: 'A100003 | 高锰酸钾稀释100ml', value: 'a3' }
];
// 输入搜索
var autoCompleteEnum;
(function (autoCompleteEnum) {
    autoCompleteEnum[autoCompleteEnum["GOODSNAME"] = 0] = "GOODSNAME";
})(autoCompleteEnum || (autoCompleteEnum = {}));
var TransferCargoStore = function (_a) {
    var dispatch = _a.dispatch, dataSourceList = _a.dataSourceList, props = __rest(_a, ["dispatch", "dataSourceList"]);
    var _b = react_1.useState(true), tableShow = _b[0], setTableShow = _b[1]; // 表格显示
    var _c = react_1.useState(false), isModalVisible = _c[0], setIsModalVisible = _c[1]; // 销量详情modal 显示
    var _d = react_1.useState([]), checkeds = _d[0], setCheckeds = _d[1]; // 表格选中
    var _e = react_1.useState(mockAutoCompleteOptions), autoComplete_options = _e[0], setAutoComplete_options = _e[1]; // 自动完成选项 - JSX | { label, value }[]
    var columns = columns_1["default"];
    // init running...
    react_1.useEffect(function () {
        dispatch({
            type: 'smarRept_createrDispatchGoodsStore/fetchDataSourceList'
        });
    }, [1]);
    // 增加行
    var creatRowHandle = function () {
        setIsModalVisible(true);
    };
    // 删除行
    var deleteRowHandle = function () {
        if (checkeds.length > 0) {
            antd_1.Modal.confirm({
                title: 'Do you Want to delete these items?',
                icon: react_1["default"].createElement(icons_1.ExclamationCircleOutlined, null),
                content: 'Some descriptions',
                onOk: function () {
                    console.log('OK');
                },
                onCancel: function () {
                    console.log('Cancel');
                }
            });
        }
    };
    // 导入
    var importExcelHandle = function () {
    };
    var searchHandle = function () {
    };
    // 全表格事件回调捕捉函数
    var tableLLEVENTCallback = function (TYPE, data) {
    };
    // 模态框回调
    var modalHandleConfrim = function (TYPE, e) {
        if (TYPE === 'OK') {
        }
        setIsModalVisible(false);
    };
    // 上传控件 - antd
    var uploadProps = {
        customRequest: function () { },
        onChange: function (res) {
            if (res.file.status !== 'uploading') {
                var reader = new FileReader();
                reader.readAsBinaryString(res.file);
                reader.onload = function (e) {
                    var data = e.target.result;
                    var wb = XLSX.read(data, { type: 'binary' });
                    var jsonData = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]], { raw: false });
                    // 模板具体方式有待商榷，再进行解析逻辑
                    antd_1.message.info('解析成功！');
                };
            }
            if (res.file.status === 'done') {
                antd_1.message.success(res.file.name + " file uploaded successfully");
            }
            else if (res.file.status === 'error') {
                antd_1.message.error(res.file.name + " file upload failed.");
            }
        }
    };
    // 选中 - 自动完成输入框
    var autoComplete_onSelect = function (TYPE, data) {
        if (TYPE === autoCompleteEnum.GOODSNAME) {
        }
        console.log('autoComplete_onSelect===', data);
    };
    //
    var autoComplete_onSearch = function (TYPE, data) {
        if (TYPE === autoCompleteEnum.GOODSNAME) {
        }
        console.log('autoComplete_onSearch===', data);
    };
    // 表格Props
    var setTableProps = {
        dataSource: dataSourceList,
        columns: columns,
        rowKey: 'id',
        ALLEVENTCallback: tableLLEVENTCallback,
        reloadApiTable: {
            rowSelection: {
                type: 'checkbox',
                onChange: function (selectedRowKeys, selectedRows) {
                    console.log("selectedRowKeys: " + selectedRowKeys, 'selectedRows: ', selectedRows);
                    setCheckeds(function (prev) {
                        return __spreadArrays(selectedRowKeys);
                    });
                },
                getCheckboxProps: function (record) { return ({
                    // disabled: record.name === 'Disabled User', // Column configuration not to be checked
                    name: record.name
                }); }
            }
        }
    };
    return (react_1["default"].createElement("div", { className: index_less_1["default"].page },
        react_1["default"].createElement("div", { className: 'common-block common-margin-vertical common-flex-wrap', style: { marginTop: 0 } },
            react_1["default"].createElement("div", { className: 'common-row-content common-flex-item' },
                react_1["default"].createElement("div", { className: 'item-div' },
                    react_1["default"].createElement("div", { className: index_less_1["default"].statisticsItem },
                        "\u5355\u636E\u7F16\u53F7\uFF1A",
                        react_1["default"].createElement("span", null, "QHD502420210205002"))))),
        react_1["default"].createElement("div", { className: 'common-block ' },
            react_1["default"].createElement(antd_1.Button, { type: "primary", ghost: true, onClick: creatRowHandle }, "\u589E\u52A0\u884C"),
            react_1["default"].createElement(antd_1.Button, { type: "primary", ghost: true, onClick: deleteRowHandle, disabled: checkeds.length === 0, style: { marginLeft: 8, marginRight: 8 } }, "\u5220\u9664\u884C"),
            react_1["default"].createElement(antd_1.Upload, __assign({}, uploadProps),
                react_1["default"].createElement(antd_1.Button, { type: "primary", ghost: true, onClick: importExcelHandle, title: "\u9009\u62E9\u4E00\u4EFDexcel\u6587\u4EF6" }, "\u5BFC\u5165"))),
        react_1["default"].createElement("div", { className: 'common-block ' + index_less_1["default"].tableBox }, tableShow &&
            react_1["default"].createElement(Table_1["default"], __assign({}, setTableProps))),
        react_1["default"].createElement("div", { className: 'common-block ' + index_less_1["default"].footerWrapper },
            react_1["default"].createElement(antd_1.Button, { style: { marginRight: 8 } }, "\u8FD4\u56DE\u5217\u8868"),
            react_1["default"].createElement(antd_1.Button, { type: "primary" }, "\u63D0\u4EA4\u5355\u636E")),
        react_1["default"].createElement(antd_1.Modal, { title: "\u589E\u52A0\u884C", visible: isModalVisible, onCancel: function () { setIsModalVisible(false); }, onOk: function (e) { return modalHandleConfrim('OK', e); } },
            react_1["default"].createElement("div", { className: index_less_1["default"].modalWrapper },
                react_1["default"].createElement("div", { className: 'common-cell-row ' + index_less_1["default"].item + ' ' + index_less_1["default"].itemAutoc },
                    react_1["default"].createElement("span", { className: 'common-cell-label ' + index_less_1["default"].label }, "\u5546\u54C1\u641C\u7D22\uFF1A"),
                    react_1["default"].createElement("div", { className: 'common-cell-value' },
                        react_1["default"].createElement(antd_1.AutoComplete, { options: autoComplete_options, style: { width: 240 }, onSelect: function (data) { return autoComplete_onSelect(autoCompleteEnum.GOODSNAME, data); }, onSearch: function (data) { return autoComplete_onSearch(autoCompleteEnum.GOODSNAME, data); }, allowClear: true, placeholder: "\u6761\u7801/\u7F16\u7801/\u540D\u79F0" }))),
                react_1["default"].createElement("div", { className: 'common-cell-row ' + index_less_1["default"].item },
                    react_1["default"].createElement("span", { className: 'common-cell-label ' + index_less_1["default"].label }, "\u5546\u54C1\u6761\u7801\uFF1A"),
                    react_1["default"].createElement("div", { className: 'common-cell-value' }, 'barCode10000012')),
                react_1["default"].createElement("div", { className: 'common-cell-row ' + index_less_1["default"].item },
                    react_1["default"].createElement("span", { className: 'common-cell-label ' + index_less_1["default"].label }, "\u5546\u54C1\u7F16\u7801\uFF1A"),
                    react_1["default"].createElement("div", { className: 'common-cell-value' }, '1225')),
                react_1["default"].createElement("div", { className: 'common-cell-row ' + index_less_1["default"].item },
                    react_1["default"].createElement("span", { className: 'common-cell-label ' + index_less_1["default"].label }, "\u5546\u54C1\u540D\u79F0\uFF1A"),
                    react_1["default"].createElement("div", { className: 'common-cell-value' }, '维生素D滴剂 400单位*12粒 悦而 青岛双鲸药业有限公司')),
                react_1["default"].createElement("div", { className: 'common-cell-row ' + index_less_1["default"].item },
                    react_1["default"].createElement("span", { className: 'common-cell-label ' + index_less_1["default"].label }, "\u8865\u8D27\u6570\u91CF\uFF1A"),
                    react_1["default"].createElement("div", { className: 'common-cell-value' },
                        react_1["default"].createElement(antd_1.Input, { placeholder: "", maxLength: 4, style: { width: 70 } }))),
                react_1["default"].createElement("div", { className: 'common-cell-row ' + index_less_1["default"].item },
                    react_1["default"].createElement("span", { className: 'common-cell-label ' + index_less_1["default"].label }, "\u91C7\u8D2D\u5206\u7C7B\u8BF4\u660E\uFF1A"),
                    react_1["default"].createElement("div", { className: 'common-cell-value' }, '赠品')),
                react_1["default"].createElement("div", { className: 'common-cell-row ' + index_less_1["default"].item },
                    react_1["default"].createElement("span", { className: 'common-cell-label ' + index_less_1["default"].label }, "\u91C7\u8D2D\u5206\u7C7B\u72B6\u6001\uFF1A"),
                    react_1["default"].createElement("div", { className: 'common-cell-value' }, '逆淘汰')),
                react_1["default"].createElement("div", { className: 'common-cell-row ' + index_less_1["default"].item },
                    react_1["default"].createElement("span", { className: 'common-cell-label ' + index_less_1["default"].label }, "\u96F6\u552E\u4EF7\uFF1A"),
                    react_1["default"].createElement("div", { className: 'common-cell-value' }, '26.3')),
                react_1["default"].createElement("div", { className: 'common-cell-row ' + index_less_1["default"].item },
                    react_1["default"].createElement("span", { className: 'common-cell-label ' + index_less_1["default"].label }, "\u5E93\u5B58\uFF1A"),
                    react_1["default"].createElement("div", { className: 'common-cell-value' }, '12'))))));
};
// connect props...
var mapStateToProps = function (ALL) {
    var smarRept_createrDispatchGoodsStore = ALL.smarRept_createrDispatchGoodsStore, loading = ALL.loading;
    console.log('testStore====>', ALL);
    return __assign({}, smarRept_createrDispatchGoodsStore);
};
exports["default"] = umi_1.connect(mapStateToProps)(TransferCargoStore);
