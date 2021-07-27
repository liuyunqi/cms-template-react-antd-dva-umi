/*
  自由配置表格模板；
  column里无需配置事件函数，这里会根据必备函数按定制化方式提前编写好；
*/
import React from 'react';
import { Input } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { ColumnsTypeMine, ColumnCustomType, customType, conditionUnit, ALLEVENTCallbackType, Enum_ALLEVENT } from './index.d';
import { dateTransformer, enumDataMode } from '@/public/utils/baseTool'

/*
@columnItem:{...}           列配置数据
@text:string | number       当前数据文本
@record:{...}               当前行完整数据 (rowData)
@index:number               index
@options: {
  customSettings: {...}     自定义属性设置
  optionsApi: {...}         组件UI-api (如: antd-ui)
}   
@ALLCALLBACK: Function      统一事件回调入口
*/

// 默认常规渲染
export const renderNORMALRENDER = (columnItem: ColumnsTypeMine, text: string, record: any, index: number, options: conditionUnit | any = {}, ALLCALLBACK: ALLEVENTCallbackType) => {
  let setProperty = options.customSettings || {};
  return (
    <div>
      <span { ...setProperty }>{ text }</span>
    </div>
  )
}


// 单输入框
export const renderINPUT = (columnItem: ColumnsTypeMine, text: string, record: any, index: number, options: conditionUnit | any = {}, ALLCALLBACK: ALLEVENTCallbackType) => {

  const props = { record, columnItem, index };

  let apis = options.optionsApi || {};
  let setApis = { ...apis };

  setApis = {...apis, ...{
    // value: text,
    value: text
  }, ...{
    onFocus: (e: MouseEvent | KeyboardEvent) => ALLCALLBACK(Enum_ALLEVENT.INPUT_onFocus, { e, ...props }),
    onChange: (e: MouseEvent | KeyboardEvent) => ALLCALLBACK(Enum_ALLEVENT.INPUT_onChange, { e, ...props }),
    onPressEnter: (e: MouseEvent | KeyboardEvent) => ALLCALLBACK(Enum_ALLEVENT.INPUT_onPressEnter, { e, ...props }),
    onBlur: (e: MouseEvent | KeyboardEvent) => ALLCALLBACK(Enum_ALLEVENT.INPUT_onBlur, { e, ...props }),
  }}
  
  return (
    <div>
      <Input { ...setApis }/>
    </div>
  )
}

// 链接按钮 - 可着色
export const renderLINKBUTTON = (columnItem: ColumnsTypeMine, text: string, record: any, index: number, options: conditionUnit | any = {}, ALLCALLBACK: ALLEVENTCallbackType) => {
  const props = { record, columnItem, index };
  const { condition: { customSettings } }: any = columnItem;
  let setStyle = {};

  if (customSettings && customSettings.style) setStyle = customSettings.style;

  let setProperty = options.customSettings || {};
  let setApis = options.optionsApi || {};

  if (setProperty && setProperty.style) setStyle = setProperty.style;

  setApis = {...setApis, ...{
    style: { ...setStyle },
    onClick: (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => ALLCALLBACK(Enum_ALLEVENT.LINKBUTTON_onClick, { e, ...props })
  }}
  
  return (
    <div>
      <a { ...setApis } > { text } </a>
    </div>
  )
}

// Date 转 日期字符串
export const renderDATESTRING = (columnItem: ColumnsTypeMine, text: string | number, record: any, index: number, options: conditionUnit | any = {}, ALLCALLBACK: ALLEVENTCallbackType) => {
  let setProperty = options.customSettings || {};
  let toNumber = parseInt(text as any);
  return (
    <div>
      <span { ...setProperty }>{ dateTransformer(new Date(toNumber), enumDataMode.FULL) }</span>
    </div>
  )
}


// 模板渲染配置器 (廢棄)
export const TABLETEMPX_UNUSE = (columns: ColumnsTypeMine, eventAllCallback: ALLEVENTCallbackType): ColumnsType<any> => {
  // 识别是否定义渲染的类型模式 - customType [ date时间/ input/ any more... ]
  
  return columns.map((item: any, index: number) => {
    const CKEY = item[customType];
    let callback: Function | null = null;

    if (CKEY) {
      if (CKEY === ColumnCustomType.INPUT) {
        callback = renderINPUT;
      } else if (CKEY === ColumnCustomType.LINKBUTTON) {
        callback = renderLINKBUTTON;
      }
    }

    if (typeof callback === 'function') {
      /*
        @item: column-item: 当表格多列都出现同个组件渲染时，可作类似symbol效果做不同数据在回调事件中的区分.
        @record: table-rowData
      */
      item.render = (text: string, record: any, index: number) => {
        return (callback as Function)(item, text, record, index, (item.optionsApi || {}), eventAllCallback)
      }
    }
    return item;
  })
}


export const TABLETEMP = (columns: ColumnsTypeMine, eventAllCallback: ALLEVENTCallbackType): ColumnsType<any> => {
  // 识别是否定义渲染的类型模式 - customType [ date时间/ input/ any more... ]

  return columns.map((item: any, index: number) => {
    const isConditionRender = item.condition;       //

    if (isConditionRender) {
      if (!Array.isArray(isConditionRender)) {
        throw Error('表格配置错误，请检查。正确格式为： condition:[boolean, render1, render2 | recursionCondition?:[...]]');
      }

      item.render = (text: string, record: any, index: number) => {
        const [ renderCall, setConf ] = recursiveCondition(isConditionRender as any, record);
        return (renderCall as Function)(item, text, record, index, ((setConf as conditionUnit) || {}), eventAllCallback);
      }
    }

    return item;
  })
}

// 递归条件
function recursiveCondition(conditArr: [
  boolean | string,
  conditionUnit,
  conditionUnit | [boolean | string, conditionUnit, conditionUnit]
], record:any) {
  let unit0 = conditArr[0];       // boolean | eval(string)
  let unit1 = conditArr[1];
  let unit2 = conditArr[2];
  let rz: boolean = false;        // 是否执行 c1
  let result: [Function, conditionUnit | {}];

  if (typeof unit0 === 'boolean') {
    rz = unit0;
  } else if (typeof unit0 === 'string') {
    rz = eval(unit0);
  }

  if (rz) {
    result = [(allocationTemp as Function)(unit1), unit1];
  } else {
    // if (unit2 === undefined) throw Error('unit2必须配置。');

    if (unit2 === undefined) {
      result = [ renderNORMALRENDER, {} ];
    } else {
      if (Array.isArray(unit2)) {
        result = recursiveCondition(unit2, record);
      } else if (typeof unit2 === 'object') {
        result = [(allocationTemp as Function)(unit2), unit2];
      } else {
        throw Error('配置的unit2参数类型不正确，请检查配置内容。');
      }
    }
  }
  return result;
}


// 模板分配
function allocationTemp(unit: conditionUnit):Function | never | null {
  const CKEY = unit[customType];
  let callback: Function | null = null;

  // 此处有修改的空间，让今后使用者能够外部定义模板及模板类型名称
  if (CKEY) {
    if (CKEY === ColumnCustomType.NORMALRENDER) {
      callback = renderNORMALRENDER;
    } else if (CKEY === ColumnCustomType.INPUT) {
      callback = renderINPUT;
    } else if (CKEY === ColumnCustomType.LINKBUTTON) {
      callback = renderLINKBUTTON;
    } else if (CKEY === ColumnCustomType.DATESTRING) {
      callback = renderDATESTRING;
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
