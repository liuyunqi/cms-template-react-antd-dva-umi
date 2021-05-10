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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
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
var antd_1 = require("antd");
var umi_1 = require("umi");
var api_1 = require("@/pages/demo/config/api");
var test_ts_1 = require("@/pages/demo/service/test.ts");
var searchHeader_1 = require("./components/searchHeader");
require("./index.less");
var defaultFirstPage = 1;
var pageSizeOptions = ['5', '10', '20', '50'];
var RQGOODSLIST;
(function (RQGOODSLIST) {
    RQGOODSLIST["NORMAL"] = "NORMAL";
    RQGOODSLIST["RESET"] = "RESET"; // 数据重置
})(RQGOODSLIST || (RQGOODSLIST = {}));
var ENUMModalState;
(function (ENUMModalState) {
    ENUMModalState["NORMAL"] = "NORMAL";
    ENUMModalState["ADD"] = "ADD";
    ENUMModalState["EDIT"] = "EDIT"; // 编辑
})(ENUMModalState || (ENUMModalState = {}));
var Test = function (props) {
    var dispatch = props.dispatch, goodsList = props.goodsList;
    var formRef = react_1["default"].createRef();
    // const [formRef] = Form.useForm();
    var _a = react_1.useState([]), tableList = _a[0], setTableList = _a[1]; // 表格列表
    var _b = react_1.useState(false), isModalVisible = _b[0], setIsModalVisible = _b[1]; // 弹窗显示
    var _c = react_1.useState(''), modalTitle = _c[0], setModalTitle = _c[1]; // 弹窗标题
    var _d = react_1.useState(null), record = _d[0], setRecord = _d[1]; // rowData - 表格选中数据
    var _e = react_1.useState(ENUMModalState.NORMAL), modalMode = _e[0], setModalMode = _e[1]; // 模态框状态 [新增/ 编辑]
    var _f = react_1.useState(false), subLoading = _f[0], setSubLoading = _f[1]; // 提交中状态
    var _g = react_1.useState('hash1'), pageUpdate = _g[0], setPageUpdate = _g[1]; // 页码更新
    var _h = react_1.useState(1), pageCurrent = _h[0], setPageCurrent = _h[1]; // 页码
    var _j = react_1.useState(5), pageLimit = _j[0], setPageLimit = _j[1]; // 单页数量
    var _k = react_1.useState(0), pageTotal = _k[0], setPageTotal = _k[1]; // 数据长度
    var columns = [
        {
            title: '商品名称',
            dataIndex: 'goodsName',
            key: 'goodsName'
        },
        {
            title: '条码',
            dataIndex: 'mainBarcode',
            key: 'mainBarcode'
        },
        {
            title: '商品编码',
            dataIndex: 'goodCode',
            key: 'goodCode'
        },
        {
            title: '操作',
            key: 'action',
            render: function (text, record) { return (react_1["default"].createElement("span", null,
                react_1["default"].createElement("a", { onClick: function () { tableHandle_edit(record); } }, "\u7F16\u8F91"),
                "\u00A0\u00A0\u00A0\u00A0",
                react_1["default"].createElement(antd_1.Popconfirm, { title: "\u662F\u5426\u5220\u9664\u3010" + record.goodsName.substring(0, 5) + "\u3011\u8BE5\u5546\u54C1\uFF1F", onConfirm: function (record) { return tableHandle_delete(record); } },
                    react_1["default"].createElement("a", { href: "#" }, "\u5220\u9664")))); }
        }
    ];
    // init
    react_1.useEffect(function () {
        request_goodsList();
    }, [1]);
    // 当弹窗被打开
    react_1.useEffect(function () {
        var _a, _b;
        // console.log(formRef)
        console.log('watch: isModalVisible', record);
        if (isModalVisible) {
            if (modalMode === ENUMModalState.EDIT) {
                (_a = formRef.current) === null || _a === void 0 ? void 0 : _a.setFieldsValue(record);
            }
            else if (modalMode === ENUMModalState.ADD) {
                (_b = formRef.current) === null || _b === void 0 ? void 0 : _b.resetFields();
            }
        }
    }, [isModalVisible]);
    // pagination
    react_1.useEffect(function () {
        // console.log(pageLimit, pageCurrent)
        // request_goodsList();
    }, [pageLimit, pageCurrent]);
    // watch Pagination change update...
    react_1.useEffect(function () {
        console.log(pageLimit, pageCurrent);
        var setMode = RQGOODSLIST.NORMAL;
        if (pageUpdate === RQGOODSLIST.RESET) {
            setMode = RQGOODSLIST.RESET;
        }
        request_goodsList(setMode);
    }, [pageUpdate]);
    console.log('getApiPrefix', api_1["default"].getApiPrefix);
    console.log('ROOT', api_1["default"].ROOTservice);
    // 获取商品列表
    var request_goodsList = function (type) {
        if (type === void 0) { type = RQGOODSLIST.NORMAL; }
        return __awaiter(void 0, void 0, void 0, function () {
            var params, res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        params = {
                            storeCode: '5024',
                            keyword: '阿莫西林',
                            pageNum: pageCurrent,
                            pageSize: pageLimit
                        };
                        return [4 /*yield*/, test_ts_1["default"].findByGoodCode(params)];
                    case 1:
                        res = _a.sent();
                        if (res) {
                            (res.count && setPageTotal(res.count));
                            if (type === RQGOODSLIST.NORMAL) {
                                setTableList(function (prev) {
                                    return __spreadArrays([], res.data);
                                });
                            }
                            else if (type === RQGOODSLIST.RESET) {
                                setTableList(res.data);
                            }
                        }
                        else {
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    // Table event
    var tableHandle_edit = function (row) {
        setModalMode(ENUMModalState.EDIT);
        setRecord(row);
        setIsModalVisible(true);
    };
    var tableHandle_delete = function () {
        antd_1.message.success('模拟删除成功');
        request_goodsList(RQGOODSLIST.RESET);
    };
    // searchCmponent event
    var searchHeader_Add = function () {
        setModalMode(ENUMModalState.ADD);
        setRecord(null);
        setIsModalVisible(true);
    };
    var searchHeader_Refresh = function () {
        setPageCurrent(1);
        setPageUpdate(function (prevCount) {
            return RQGOODSLIST.RESET;
        });
    };
    var searchHeader_Change = function (e) {
        console.log(e);
    };
    // Modal event
    var modalConfrimOK = function () {
        var _a;
        console.log(formRef);
        console.log(record);
        (_a = formRef.current) === null || _a === void 0 ? void 0 : _a.submit();
        // formRef.current?.resetFields();
        // setIsModalVisible(false);
    };
    // Form event
    var formSubmitHandle = function () {
        var key = 'submit';
        antd_1.message.loading({ content: '当前正在模拟请求', key: key });
        setSubLoading(true);
        setTimeout(function () {
            if (modalMode === ENUMModalState.ADD) {
                antd_1.message.success({ content: '模拟新增 - successfully！', key: key });
            }
            else if (modalMode === ENUMModalState.EDIT) {
                antd_1.message.success({ content: '模拟编辑 - saveOver！', key: key });
            }
            setSubLoading(false);
            setIsModalVisible(false);
        }, 1200);
    };
    var formFinishFailedHandle = function (e) {
        antd_1.message.warn('表单验证失败，请检查！');
    };
    // pagination event
    var onPaginationChange = function (page, pageSize) {
        setPageCurrent(page);
        setPageLimit(pageSize);
        setPageUpdate(function (prevCount) {
            return prevCount + 1;
        });
    };
    var onPaginationShowSizeChange = function (current, size) {
        /* setPageCurrent(2);
        setPageLimit(size);
        setPageUpdate(prevCount => {
          return prevCount + 1;
        }); */
    };
    var layout = {
        labelCol: { span: 4 },
        wrapperCol: { span: 20 }
    };
    return (react_1["default"].createElement("div", { className: "testPage-table-wrapper" },
        react_1["default"].createElement("div", { className: "test-searchHeader-wrap" },
            react_1["default"].createElement(searchHeader_1["default"], { className: "customParent-SearchHeader", onAdd: searchHeader_Add, onChange: searchHeader_Change, onRefresh: searchHeader_Refresh })),
        react_1["default"].createElement(antd_1.Table, { columns: columns, dataSource: tableList, rowKey: "mainBarcode", pagination: false }),
        react_1["default"].createElement(antd_1.Pagination, { showSizeChanger: true, defaultCurrent: defaultFirstPage, current: pageCurrent, total: pageTotal, pageSize: pageLimit, pageSizeOptions: pageSizeOptions, onChange: onPaginationChange, onShowSizeChange: onPaginationShowSizeChange }),
        react_1["default"].createElement(antd_1.Modal, { title: modalMode === ENUMModalState.ADD ? "\u65B0\u589E" : modalMode === ENUMModalState.EDIT ? '编辑' : '默认标题', visible: isModalVisible, confirmLoading: subLoading, onOk: modalConfrimOK, onCancel: function () { setIsModalVisible(false); }, forceRender: true },
            react_1["default"].createElement(antd_1.Form, __assign({}, layout, { name: "rowInfo", onFinish: formSubmitHandle, onFinishFailed: formFinishFailedHandle, ref: formRef }),
                react_1["default"].createElement(antd_1.Form.Item, { label: "\u5546\u54C1\u540D\u79F0", name: "goodsName", rules: [{ required: true, message: '不能为空' }] },
                    react_1["default"].createElement(antd_1.Input, null)),
                react_1["default"].createElement(antd_1.Form.Item, { label: "\u6761\u7801", name: "mainBarcode", rules: [{ required: true, message: '不能为空' }] },
                    react_1["default"].createElement(antd_1.Input, null)),
                react_1["default"].createElement(antd_1.Form.Item, { label: "\u5546\u54C1\u7F16\u7801", name: "goodCode", rules: [{ required: true, message: '不能为空' }] },
                    react_1["default"].createElement(antd_1.Input, null))))));
};
var mapStateToProps = function (ALL) {
    var testStore = ALL.testStore, loading = ALL.loading;
    console.log('testStore====>', testStore, ALL);
    return __assign({}, ALL);
};
exports["default"] = umi_1.connect(mapStateToProps)(Test);
