import { ColumnsType, ColumnType } from 'antd/es/table';


export const customType = 'customType';    // 自定义列项渲染类型 - fix Key

// 自定义的表格列项类型
export enum ColumnCustomType {
  NORMALRENDER = 'NORMALRENDER',  // 默认渲染text
  INPUT = 'INPUT',                // input 输入单框
  LINKBUTTON = 'LINKBUTTON',      // 链接按钮
  DATESTRING = 'DATESTRING',      // date转字符
}

/* export interface ColumnsTypeMine extends ColumnsType<any> {
    customType?: ColumnCustomType;
} */

export interface ColumnsTypeMine extends ColumnsType<any> {
  condition?: [
    boolean | string,
    conditionUnit,
    conditionUnit | [boolean | string, conditionUnit, conditionUnit]
  ] | 
  [
    boolean | string,
    conditionUnit
  ];
  customType?: ColumnCustomType;
  customSettings?: any;
}

// 全局自定义事件回调
export interface ALLEVENTCallbackType {
  (EVENTTYPE: Enum_ALLEVENT, data: any): void;
}


// 全事件类型枚举
export enum Enum_ALLEVENT {
  // 输入框
  'INPUT_onFocus',
  'INPUT_onChange',
  'INPUT_onPressEnter',
  'INPUT_onBlur',
  // 链接按钮
  'LINKBUTTON_onClick'
}



export interface conditionUnit {
  customType: ColumnCustomType;       // 自定义的模板枚举TYPE标识
  customSettings?: any;               // 自定义对【结构】的自由配置处 （例 {style, .... }，根据不同模板使用不同关键值）
  optionsApi?: any;                   // 自定义对【组件】的自由配置处，按组件具体API配置
}

export interface conditionUnitComb {
  
}


// 表格列重载 - item
export interface rcColumnItem extends ColumnType<any> {
  name: string;
  key?: string;   // is xx enum
  /* customType?: ColumnCustomType;      // 自定义的模板枚举TYPE标识
  customSettings?: any;               // 自定义对【结构】的自由配置处 （例 {style, .... }，根据不同模板使用不同关键值）
  optionsApi?: any;                   // 自定义对【组件】的自由配置处，按组件具体API配置 */

  condition?: [
    boolean | string,
    conditionUnit,
    conditionUnit | [boolean | string, conditionUnit, conditionUnit]
  ] | 
  [
    boolean | string,
    conditionUnit
  ];
}

// 表格列重载 - item{conf}
export interface rcColumnItemConf {
  [n: string]: rcColumnItem;
}

// 表格列重载 - must key!
export interface rcColumnItemSet extends rcColumnItem {
  key: string;   // is xx enum
}
