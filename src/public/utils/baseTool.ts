
export enum enumDataMode {
  FULL = 'full',
  YMD = 'yMd',
  YMDHM = 'yMdhm',
  YMDHMS = 'yMdhms',
  HMS = 'hms',
  HM = 'hm'
}

// Date对象 转换为 时间字符串(多种款)
export const dateTransformer = (dt: Date | number, viewMode?: enumDataMode): string => {  // dt= new Date(1823811128时间戳) , viewMode = 显示模式

  if (typeof dt === 'number') {
    dt = new Date(dt);
  }

  let year = dt.getFullYear(),
      month = addZero(dt.getMonth()+1),
      date = addZero(dt.getDate()),
      hour = addZero(dt.getHours()),
      minute = addZero(dt.getMinutes()),
      second = addZero(dt.getSeconds());

  function addZero(numb: number): string | number {
    let rNum: string | number = numb;
    if (numb >= 0 && numb <= 9) rNum = '0' + numb;
    return rNum;
  }

  let dateStr = '';
  
  if (viewMode === enumDataMode.FULL || !viewMode) {
    dateStr = year + '-' + month + '-' + date + ' ' + hour + ':' + minute + ':' + second;
  } else if (viewMode === enumDataMode.YMD) {
    dateStr = year + '-' + month + '-' + date;
  } else if (viewMode === enumDataMode.YMDHM) {
    dateStr = year + '-' + month + '-' + date + ' ' + hour + ':' + minute;
  } else if (viewMode === enumDataMode.YMDHMS) {
    dateStr = year + '-' + month + '-' + date + ' ' + hour + ':' + minute + ':' + second;
  } else if (viewMode === enumDataMode.HMS) {
    dateStr = hour + ':' + minute + ':' + second;
  } else if (viewMode === enumDataMode.HM) {
    dateStr = hour + ':' + minute;
  }
  return dateStr;
}


// 嵌套层级字符替换数据转换函数
/*
  desc: 将对象数组数据进行无限递归转换，替换数据原字段为自定义字段。（且可选是否移除原字段数据）

  @data: [{...}, ...],  // 源数据
  @tranConf: {          // 转换字段配置
    O:N,                // 【O】:old，转换目标字段。【N】:new，更新的定义字段。
    ...
  },
  @options:             // 相关配置
*/

export interface recursionDataKeyTransformConf {
  isChildrenKey: string;          // 层级数据字段
  [key: string]: any;
}

export interface recursionDataKeyTransformOpt {
  needDeleteBefore: boolean;      // 是否删除原先数据
}

export const recursionDataKeyNameTransform = <T>(data: T[], tranConf: recursionDataKeyTransformConf = { isChildrenKey: 'children' }, options: recursionDataKeyTransformOpt = {
  needDeleteBefore: true
}): T[] => {

  if (Object.keys(tranConf).length === 1) return data;

  let childrenKey = tranConf[tranConf.isChildrenKey];     // isChildrenKey 中配置的字段的value必须存在于tranConf的key中。
  if (!childrenKey) throw Error('recursionDataKeyNameTransform Function Error: the transformConfig "isChildrenKey" is notfind.');

  let oldKeys = Object.keys(tranConf);
  const { needDeleteBefore } = options;

  // 转换函数
  const trans = (item: any) => {
    // 遍历在册字段
    oldKeys.forEach(oKey => {
      if (oKey === tranConf.isChildrenKey) return;
      let value = item[oKey];
      if (value) {
        item[tranConf[oKey]] = value;
        (needDeleteBefore && oKey!==tranConf[oKey]) && delete item[oKey];
        // needDeleteBefore && delete item[oKey];
      }
    });

    if (item[tranConf.isChildrenKey]) {
      let childrenArr = item[tranConf.isChildrenKey].map((citem: {}) => {
        return trans(citem);
      });
      item[childrenKey] = childrenArr;
      (needDeleteBefore && childrenKey!==tranConf.isChildrenKey) && delete item[tranConf.isChildrenKey];
    }
    return item;
  }

  return JSON.parse(JSON.stringify(data)).map((item: T) => {
    return trans(item);
  });
}


/*
@select: * 部门层级-01-公司, 02-中心, 03-营运区, 04-部门, 05-组, 06-片区, 07-门店
*/
export enum organizationHierarchyCode {
  company = '01',
  center = '02',
  district = '03',
  department = '04',
  group = '05',
  area = '06',
  store = '07'
}

// 门店数据筛查 - 介于公司目前请求到的 组织结构数据 并不能完整筛查出纯粹的门店数据。
export const transformCompanyTreeData = (treeData: any[], select: string) => {
  let defKey = {
    hierarchy: 'hierarchy',
    children: 'children',
    storeCode: 'storeCode'
  };
  let nodeData: any[] = [];
  treeData.forEach(item => {
    if (item[defKey.hierarchy] === organizationHierarchyCode.department && !item[defKey.children]) return;

    if (item[defKey.children]) {
      item[defKey.children] = transformCompanyTreeData(item[defKey.children], select);
    }

    let isStore = item[defKey.hierarchy] === select && select === organizationHierarchyCode.store;    // 设定层级是门店 且 当前数据是门店
    if (isStore) {
      item.key = item[defKey.storeCode];
    }

    nodeData.push(item);
  });
  return nodeData;
}

// 路径合并, 去除拼接处 多或少的 '/'
export const mergeUrl = (arr: string[]): string => {
  let url = '';
  arr.forEach((iur: string, index: number) => {
    let even = iur;
    if (index > 0) {
      let prev = arr[index - 1];
      if (prev[prev.length - 1] === '/' && iur[0] === '/') {
        even = iur.substring(1);
      } else if (prev[prev.length - 1] !== '/' && iur[0] !== '/') {
        even = '/' + iur;
      }
    }
    url += even;
  });
  return url;
}

// 数组转换 - 一维转二维
export const ArrayVeidooTransfrom = (
  list = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19],
  mo = 6
) => {
  let resl: any[] = [];
  let ev: any[] = [];

  list.forEach((item, index) => {

    if (index % mo === 0) ev = [];

    ev.push(item);

    if (index % mo === mo -1 || index == list.length -1) resl.push(ev);
  });
  return resl;
}


// 防抖
export class Debounced {
  /**
   * @param func 需要包装的函数
   * @param delay 延迟时间，单位ms
   * @param immediate 是否默认执行一次(第一次不延迟)
   */
  public use = (func: Function, delay: number, immediate: boolean = false): Function => {
    let timer: number | undefined | any;
    return ( ...args: any) => {
      if (immediate) {
        func.apply(this, args) // 确保引用函数的指向正确，并且函数的参数也不变
        immediate = false;
        return;
      }
      clearTimeout(timer);
      timer = setTimeout(() => {
        func.apply(this, args);
      }, delay);
    }
  }
}

// 节流
export class Throttle {
  private timer: number | undefined;
  private stop: boolean = false;
  private death: boolean = false;
  /**
   * @param func 需要包装的函数
   * @param delay 延迟时间，单位ms
   * @param immediate 是否默认执行一次(第一次不延迟)
   */
  public use (func: Function, delay: number, immediate: boolean = false): Function {
    let flag = true;
    const self = this;
    return (...args: any) => {
      if (this.death) {
        func.apply(this, args);
        return;
      }
      if (this.stop) {
        func.apply(this, args);
        return;
      }
      if (immediate) {
        func.apply(this, args);
        immediate = false;
        return;
      }

      if (!flag) return;

      flag = false;
      (self as any).timer = setTimeout(() => {
        func.apply(this, args);
        flag = true;
      }, delay);
    }
  }

  // 销毁
  public destroy() {
    this.death = true
    this.stop = true
    if (!!this.timer) {
      clearTimeout(this.timer)
      this.timer = undefined
    }
  }
  // 开启
  public open() {
    if (!this.death) {
      this.stop = false
    }
  }
  // 关闭
  public close() {
    this.stop = true
  }
}


// 存取器 - 过期限制
export interface accessOverdue_defaultOption {
  projectAlias: string;
  saveObject: accessOverdue_saveObjectEnum;
  overdueTimeSecond: number;
  
}

export enum accessOverdue_saveObjectEnum {
  sessionStorage = 'sessionStorage',
  localStorage = 'localStorage'
}

interface accesItem {
  creatertime: number;    // is Date.getTime()
  value: any;
}

export  class AccessorOverdue {

  public defaultOptions: accessOverdue_defaultOption = {
    projectAlias: 'baseToolAccessOverdue',                            // 命名空间
    saveObject: accessOverdue_saveObjectEnum.sessionStorage,          // 存储对象 'sessionStorage' | 'localStorage'
    overdueTimeSecond: 60                                             // 过期时间 - 1 = 1s (单位/秒) 
  };

  constructor(options: {} = {}) {
    this.defaultOptions = {
      ...this.defaultOptions,
      ...options
    };
  }

  // 获取当前时间戳
  private getDateNumber (): number {
    return new Date().getTime();
  }

  // 获取sessionKey
  private getKeyName (key: string): string {
    return this.defaultOptions.projectAlias + '-' + key;
  }

  // 获取存储对象
  private getAccessObject (TYPE?: accessOverdue_saveObjectEnum) {

    const { saveObject } = this.defaultOptions;
    var result: any;

    switch(saveObject) {
      case accessOverdue_saveObjectEnum.sessionStorage: {
        result = sessionStorage;
      };
      break;
      case accessOverdue_saveObjectEnum.localStorage: {
        result = localStorage;
      }
    }

    return result;
  }

  // 写入存储
  setItem (key: string, data: any) {
    const sKey = this.getKeyName(key);
    const access: Storage = this.getAccessObject();
    const setData: accesItem = {
      creatertime: this.getDateNumber(),
      value: data
    };

    access.setItem(sKey, JSON.stringify(setData));
  }

  // 提取存储
  getItem (key: string, overdueTimeSecond?: number) {
    const sKey = this.getKeyName(key);
    const access: Storage = this.getAccessObject();
    const oTime = overdueTimeSecond || this.defaultOptions.overdueTimeSecond;
    let _isInvalid = false;     // 失效状态
    let getData: accesItem;
    let emptyData = {
      creatertime: 0,
      value: 'undefined'
    };

    try {
      getData = JSON.parse(access.getItem(sKey) as any);
    } catch (err) {
      getData = emptyData;
      _isInvalid = true;
    }

    if (getData === null) {
      getData = emptyData;
      _isInvalid = true;
    }
    
    return {
      isInvalid: (
        _isInvalid ||
        (this.getDateNumber() - getData.creatertime) / 1000) > oTime,
      value: getData
    };
  }

  // 指定删除
  removeItem (keys: string | string[]) {
    const fKeys = Array.isArray(keys) ? keys : [keys];
    const access: Storage = this.getAccessObject();

    fKeys.forEach(key => {
      const sKey = this.getKeyName(key);
      access.removeItem(sKey);
    });
  }
}