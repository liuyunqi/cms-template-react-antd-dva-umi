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
exports.__esModule = true;
exports.TABLETEMP = exports.TABLETEMPX = exports.renderLINKBUTTON = exports.renderINPUT = exports.renderNORMALRENDER = void 0;
/*
  自由配置表格模板；
  column里无需配置事件函数，这里会根据必备函数按定制化方式提前编写好；
*/
var react_1 = require("react");
var antd_1 = require("antd");
var index_d_1 = require("./index.d");
/*


*/
/*
  customSettings
  optionsApi
*/
// 默认常规渲染
exports.renderNORMALRENDER = function (columnItem, text, record, index, options, ALLCALLBACK) {
    if (options === void 0) { options = {}; }
    var setProperty = options.customSettings || {};
    return (react_1["default"].createElement("div", null,
        react_1["default"].createElement("span", __assign({}, setProperty), text)));
};
// 单输入框
exports.renderINPUT = function (columnItem, text, record, index, options, ALLCALLBACK) {
    if (options === void 0) { options = {}; }
    var props = { record: record, columnItem: columnItem, index: index };
    var apis = options.optionsApi || {};
    var setApis = __assign({}, apis);
    setApis = __assign(__assign(__assign({}, apis), {
        // value: text,
        value: text
    }), {
        onChange: function (e) { return ALLCALLBACK(index_d_1.Enum_ALLEVENT.INPUT_onChange, __assign({ e: e }, props)); },
        onPressEnter: function (e) { return ALLCALLBACK(index_d_1.Enum_ALLEVENT.INPUT_onPressEnter, __assign({ e: e }, props)); },
        onBlur: function (e) { return ALLCALLBACK(index_d_1.Enum_ALLEVENT.INPUT_onBlur, __assign({ e: e }, props)); }
    });
    return (react_1["default"].createElement("div", null,
        react_1["default"].createElement(antd_1.Input, __assign({}, setApis))));
};
// 链接按钮 - 可着色
exports.renderLINKBUTTON = function (columnItem, text, record, index, options, ALLCALLBACK) {
    if (options === void 0) { options = {}; }
    var props = { record: record, columnItem: columnItem, index: index };
    var customSettings = columnItem.condition.customSettings;
    var setStyle = {};
    if (customSettings && customSettings.style)
        setStyle = customSettings.style;
    var setProperty = options.customSettings || {};
    var setApis = options.optionsApi || {};
    if (setProperty && setProperty.style)
        setStyle = setProperty.style;
    setApis = __assign(__assign({}, setApis), {
        style: __assign({}, setStyle),
        onClick: function (e) { return ALLCALLBACK(index_d_1.Enum_ALLEVENT.LINKBUTTON_onClick, __assign({ e: e }, props)); }
    });
    return (react_1["default"].createElement("div", null,
        react_1["default"].createElement("a", __assign({}, setApis),
            " ",
            text,
            " ")));
};
// 模板渲染配置器 (廢棄)
exports.TABLETEMPX = function (columns, eventAllCallback) {
    // 识别是否定义渲染的类型模式 - customType [ date时间/ input/ any more... ]
    return columns.map(function (item, index) {
        var CKEY = item[index_d_1.customType];
        var callback = null;
        if (CKEY) {
            if (CKEY === index_d_1.ColumnCustomType.INPUT) {
                callback = exports.renderINPUT;
            }
            else if (CKEY === index_d_1.ColumnCustomType.LINKBUTTON) {
                callback = exports.renderLINKBUTTON;
            }
        }
        if (typeof callback === 'function') {
            /*
              @item: column-item: 当表格多列都出现同个组件渲染时，可作类似symbol效果做不同数据在回调事件中的区分.
              @record: table-rowData
            */
            item.render = function (text, record, index) {
                return callback(item, text, record, index, (item.optionsApi || {}), eventAllCallback);
            };
        }
        return item;
    });
};
exports.TABLETEMP = function (columns, eventAllCallback) {
    // 识别是否定义渲染的类型模式 - customType [ date时间/ input/ any more... ]
    return columns.map(function (item, index) {
        var isConditionRender = item.condition; //
        if (isConditionRender) {
            if (!Array.isArray(isConditionRender)) {
                throw Error('表格配置错误，请检查。正确格式为： condition:[boolean, render1, render2 | recursionCondition?:[...]]');
            }
            item.render = function (text, record, index) {
                var _a = recursiveCondition(isConditionRender, record), renderCall = _a[0], setConf = _a[1];
                return renderCall(item, text, record, index, (setConf || {}), eventAllCallback);
            };
        }
        return item;
    });
};
// 递归条件
function recursiveCondition(conditArr, record) {
    var unit0 = conditArr[0]; // boolean | eval(string)
    var unit1 = conditArr[1];
    var unit2 = conditArr[2];
    var rz = false; // 是否执行 c1
    var result;
    if (typeof unit0 === 'boolean') {
        rz = unit0;
    }
    else if (typeof unit0 === 'string') {
        rz = eval(unit0);
    }
    if (rz) {
        result = [allocationTemp(unit1), unit1];
    }
    else {
        // if (unit2 === undefined) throw Error('unit2必须配置。');
        if (unit2 === undefined) {
            result = [exports.renderNORMALRENDER, {}];
        }
        else {
            if (Array.isArray(unit2)) {
                result = recursiveCondition(unit2, record);
            }
            else if (typeof unit2 === 'object') {
                result = [allocationTemp(unit2), unit2];
            }
            else {
                throw Error('配置的unit2参数类型不正确，请检查配置内容。');
            }
        }
    }
    return result;
}
// 模板分配
function allocationTemp(unit) {
    var CKEY = unit[index_d_1.customType];
    var callback = null;
    if (CKEY) {
        if (CKEY === index_d_1.ColumnCustomType.NORMALRENDER) {
            callback = exports.renderNORMALRENDER;
        }
        else if (CKEY === index_d_1.ColumnCustomType.INPUT) {
            callback = exports.renderINPUT;
        }
        else if (CKEY === index_d_1.ColumnCustomType.LINKBUTTON) {
            callback = exports.renderLINKBUTTON;
        }
    }
    if (typeof callback !== 'function') {
        throw Error('配置的模板类型名称不正确，请检查。');
    }
    return callback;
}
/*

// 类似 if else 方式
{
  name: '补货数量',
  condition: [
    true,
    {
      customType: ColumnCustomType.INPUT,
      optionsApi: {
        style: { width: 56 },
        maxLength: 4
      }
    },{
      customType: ColumnCustomType.TEXT,
      optionsApi: {
        style: { width: 56 },
        maxLength: 4
      }
    }
  ]
}

// 递归无限层级
{
  name: '补货数量',
  condition: [
    true,
    {
      customType: ColumnCustomType.INPUT,
      optionsApi: {
        style: { width: 56 },
        maxLength: 4
      }
    },[
      true,
      {
        customType: ColumnCustomType.TEXT,
        optionsApi: {
          style: { width: 56 },
          maxLength: 4
        }
      }, [ 无限层级... ]
    ]
  ]
}

*/
