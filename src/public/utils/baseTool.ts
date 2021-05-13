
export enum enumDataMode {
  FULL = 'full',
  YMD = 'yMd',
  YMDHM = 'yMdhm',
  YMDHMS = 'yMdhms',
  HMS = 'hms',
  HM = 'hm'
}

// Date对象 转换为 时间字符串(多种款)
export const dateTransformer = (dt: Date, viewMode?: enumDataMode): string => {  // dt= new Date(1823811128时间戳) , viewMode = 显示模式
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
