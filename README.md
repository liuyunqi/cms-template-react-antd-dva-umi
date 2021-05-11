
## 项目结构
.
├── config                                 # 项目配置文件                                                                                                                     
│   ├── config.development.ts              # dev环境注入文件
│   ├── config.local.ts                    # local环境注入文件
│   ├── config.prod.ts                     # prod环境注入文件
│   ├── config.test.ts                     # test环境注入文件
│   └── config.ts                          # 基础配置文件-路由-打包-dva-antd等等
├── mock                                   # 本地mock数据接口
├── src                                    # 源码目录
│   ├── .umi                               # 脚手架的临时文件夹(可以不用管，也不需要上传至svn)
│   ├── locales                            # 国际化
│   │   └── zh-CN.ts                       # 中文-项目如组件默认语言替换为中文
│   ├── pages                              # 相当于app，因为脚手架约定不能修改名称
│   │   ├── demo                           # 脚手架提供的示例模块
│   │   └── 
│   ├── public                             # 公共依赖的文件夹
│   │   ├── components                     # 全局的公共组件
│   │   │   └── index.ts                   # 导出的组件
│   │   ├── resources                      # 全局的资源文件夹
│   │   │   ├── img                        # 全局的图片资源
│   │   │   └── styles                     # 全局的样式文件
│   │   ├── services                       # 全局的服务组件
│   │   │   ├── index.ts                   # 导出的文件与组件
│   │   │   └── request.ts                 # 全局提供的请求工具
│   │   └── utils                          # 全局的工具文件夹
│   │       └── Env.ts                     # 当前的运行环境变量
├── package.json                           # 项目依赖，启动脚本等
├── README.md                              # 项目说明文件
├── tsconfig.json                          # ts配置
└── typings.d.ts                           # ts的全局声明

> 注意如果需要多个菜单上业务关联不强，建议使用多模块进行开发。

*多模块配置*
1.在`package.json`进行`script`配置启动与打包命令，分别对应开发、测试、生产环境。
2.在`src/pages/`下进行模块的创建。


> 约定式的 model 组织方式 


`
符合以下规则的文件会被认为是 model 文件，

src/models 下的文件
src/pages 下，子目录中 models 目录下的文件
src/pages 下，所有 model.ts 文件`

model 命名需要已 模块名为前缀+页面名 ，如：当前模块是demo,当前页面为home，最终model的namespace => demoHomeStore .


## BambooSnake-React [dva + umi + antd]

author：lyq

>本人对目前通过  dva umi 构建的项目框架本身进行了相关的组件封装开发，目的是提高开发效率，降低开发难度。将中后台项目中会多次出现的需求及功能将其整合封装起来。

## 表格篇

目前表格使用 antd-UI ，表格组件封装了 Table-antd 和 Pagination-antd；

```javascript
// 使用bamboo表格组件
import BambooTable from '../../components/Table';

return (
    <BambooTable dataSource={ dataSourceList } columns={ columns } rowKey={ 'id' } ALLEVENTCallback={ tableLLEVENTCallback }/>
)
```

## 列头配置

推荐方式为独立的 列头配置文件 和 列头.d

```
...,
mock,
pages --> homePage --> [ index.tsx, index.less, columns.ts, columns.d.ts ],
...otherlibs

```

```javascript
// columns.ts

import { ColumnsType } from 'antd/es/table';
import { ColumnsTypeMine } from '../../components/Table/index.d';
import { columnItemDecorator } from '../../components/Table/creator';
import { keys } from './columns.d';

// 字段配置
const originalConfMax = (
  columnItemDecorator
)({
  [keys.mainbarCode]: { name: '商品条码' },
  [keys.goodCode]: { name: '商品编码' }
}, keys);


/*

originalConfMax 生成后的数据格式为：type is Object
{
  mainbarCode:{
    dataIndex: "mainbarCode",
    key: "mainbarCode",
    name: "商品条码",
    title: "商品条码"
  },
  ...
}

columnItemDecorator 是数据装饰的函数，通过编码人员简单的columnitem配置就能生产完整的数据，数据符合antd的api及bamboo组件封装props要求，且写少做多。
*/

// 将其导出
export const column_ALL: ColumnsTypeMine = [
  originalConfMax[keys.goodName],
  originalConfMax[keys.mainbarCode]
];

```

```javascript
// columns.d.ts

// ts 字段枚举配置
export enum keys {
  mainbarCode = 'mainbarCode',      // 商品条码
  goodCode = 'goodCode'             // 商品条码
}
```

columns.d.ts 的<kbd>keys</kbd>是枚举对象，键值对形式，其中【键】命名后不可更改，【值】则根据实际数据字段自由更改。
这里之所以使用<kbd>columns.ts</kbd>和<kbd>columns.d.ts</kbd>方式，而不直接定义在index.tsx里是因为有以下几种应用情况。

·当前页面为 tabs切卡 + 表格，每次切换不同 tab-item，每个tab的表格列头不一致，统一配置达到复用目的；
·使用手动静态mock，mockdata的 key 与 真实完全同步，所以配置当前到enum对象中；



## 多功能配置ACTIONS

右侧的操作列头，支持多种需求，如：

点击回调、点击模态框弹窗、点击确认气泡、隐藏、隐藏且占位、禁用锁定、仅某一条符合某条件、多渲染模式同时并存、仅图标、图标+文字、悬停是否显示title、仅图标锁定。

```javascript
// @/components/Table/tableMock.tsx

import { enumEventType, sActions as ActionInterface } from './creator';
import { HomeOutlined } from '@ant-design/icons';

// 这是一个配置好的 操作栏 - ACTIONS
export const setActionsTestMock : ActionInterface[] = [
  // 事件交互
  {
    text: '点击回调',
    condition: {
      hide: `['2', '3'].includes(record.key)`
    },
    eventType: enumEventType.CALLBACK,
    eventSubstance(record: RowProps) {
      alert('can run xxx function event.');
    }
  }, {
    text: '模态框',
    condition: {
      hide: `['2', '3'].includes(record.key)`
    },
    eventType: enumEventType.MODALBOX,
    eventSubstance: {
      title: '模态框标题',
      content: (
      <div>
        这是一段询问的内容，吧啦吧啦。。。
      </div>),
      ok(record) {
        alert('ok')
      },
      cancel() {
        alert('cancel')
      }
    }
  }, {
    text: '气泡确认框',
    condition: {
      hide: `['2', '3'].includes(record.key)`
    },
    eventType: enumEventType.POPCONFIRM,
    eventSubstance: {
      title: '气泡标题',
      content: '嗯哼？',
      ok(record) {
        alert('ok')
      },
      cancel() {
        alert('cancel')
      }
    }
  },

  // 按鈕狀態
  {
    text: '隐藏且占位',
    condition: {
      transparent: `true`,
      hide: `['1', '3'].includes(record.key)`
    },
    eventType: enumEventType.CALLBACK,
    eventSubstance(record: RowProps) {
      alert('can run xxx function event.');
    }
  },
  {
    text: '显示图标',
    icon: <HomeOutlined/>,
    condition: {
      hide: `['1', '2'].includes(record.key)`
    },
    eventType: enumEventType.CALLBACK,
    eventSubstance() {

    },
    viewMode: enumViewMode.ICONTEXT
  }

  ....    /* 还有非常多种 */
]

```

上述还有非常多种，具体可以参考 @/components/Table/tableMock.tsx。（同时你可以使用该文件内的数据生成示例参考，datasource、columns、actions 都是齐全的）

<b>eventType</b> 为事件响应模式 { enumEventType.CALLBACK, enumEventType.MODALBOX, enumEventType.POPCONFIRM }；  

<b>eventSubstance</b> 为配套对应不同 eventType , 配置完全不同；  

<b>condition</b> 为渲染条件，内含 { hide, transparent, locked }, 优先级按此序列；条件书写为 eval(string), 内置关键字为 'record';  

<b>viewMode</b> 为渲染显示模式，文字/icon, { enumViewMode.DEFAULT, enumViewMode.ICON, enumViewMode.ICONTEXT }。


应用上述 ACTIONS

```javascript

import { setActionsTestMock } from '@/components/Table/tableMock.tsx';
import { ColumnRender_operationAction } from './creator';

export const setColumns = [
  {
    title: '创建人',
    dataIndex: 'str3',
    key: 'str3',
  },
  {
    title: '操作',
    key: 'action',
    render: (text: string, record: any, index: number) => {

      let setActionsTest = setActionsTestMock;

      // if 条件变更 setActions ...
      return ColumnRender_operationAction(text, record, index, setActionsTest);
    }
  }
];

```

更多细节建议利用mock数据做一个例子，并花30分逐个尝试并理解为最佳。这里就没有逐一全部写清楚了。


## column-item 配置定制化模板

比如有的表格内部，需要input、货币格式转换、时间戳转字符串、进度条（节状、直条、或任意款式）、高亮link内容等错综复杂的万象需求...，都可以按照目前组件提供的模式完成。

配置示例：

```javascript

// 这里就写局部结构，完整内容参考已上述过的【列头配置】
{
  [keys.salesForecast]: {
    name: '链接文本',             // 其实这里是  列头名称，为方便理解这个改为了 ’示例模板名称‘
    condition: [
      'record.id !== "3"',
      {
        customType: ColumnCustomType.LINKBUTTON,
        customSettings: {
          style: {
            fontWeight: 'bold'
          }
        }
      }
    ]
  },

  [keys.replenishNumber]: {
    name: '输入框',               // 其实这里是  列头名称，为方便理解这个改为了 ’示例模板名称‘
    condition: [
      'record.id !== "3"',
      {
        customType: ColumnCustomType.INPUT,
        optionsApi: {
          style: { width: 56 },
          maxLength: 4
        }
      },
      {                                                   // 其实该处整个{}对象配置可以省略，组件内部会默认使用 NORMALRENDER 渲染正常文本显示。
        customType: ColumnCustomType.NORMALRENDER,        // 默认渲染普通文本
      }
    ]
  }
}

```

上述代码示例中出现了三个组件内置模板，ColumnCustomType { LINKBUTTON, INPUT, NORMALRENDER }。

<b>optionsApi</b> 为antd-api，这里的设置参数全部是直接 setProps 到 antd-DOM 上的。根据不同的组件查看官方具体的api。
<b>customSettings</b> 设置一些自定义的dom属性，比如 customSettings.style， 这些最终也会以 setProps 方式应用到 DOM 中；

为了方便理解，从概念上 <b>optionsApi</b> 可看作【setApis】，<b>customSettings</b>可看作【setPropertys】。


##### condition

这里condition（条件）要特别说下，它决定了被配置列头里的渲染条件，根据条件满足与否执行A/B；

condition本身是数组，参考概念为 condition = [ boolean, A, B ]。
c[0] 是布尔，成功执行A，不满足执行B；
A/B  是一个单个模板完整的配置方案；
B 非必填，不填时则渲染默认模板 ColumnCustomType.NORMALRENDER（默认文本显示）。


c[0]：书写可以是 true/ false/ 表达式， 或 eval(string)，string数据关键字为 'record';

同时为<b>满足相对复杂的业务需求</b>，这里支持无限层级的  if else 嵌套，代码如下：

```javascript

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

```

## 模板template

目前使用的模板都是内置的。在 ./template.tsx 中。
需要新增则需要扩展 ColumnCustomType 类型名称 及 对应的 render 函数。

理想的最优解为之后迭代，让今后使用者能够外部定义追加扩展模板及模板类型名称。

## 表格事件

通过配置表格组件Props - ALLEVENTCallback, 传入一个方法，该方法仅会响应 template 模板事件。

```javascript

// 全表格事件回调捕捉函数
const tableLLEVENTCallback: ALLEVENTCallbackType = (TYPE, data) => {

  // 输入框 - 每次输入
  if (TYPE === Enum_ALLEVENT.INPUT_onChange) {
    const { e, record, columnItem, index } = data;
    let key = columnItem.key;
    let value = e.target.value;
    
    //...
  }
  // 输入框 - 回车 / 失焦
  else if (TYPE === Enum_ALLEVENT.INPUT_onPressEnter || TYPE === Enum_ALLEVENT.INPUT_onBlur) {

  }
  // 点击 预测销量
  else if (TYPE === Enum_ALLEVENT.LINKBUTTON_onClick) {
    // do anything...
  }
}

```

顺便提一嘴，操作栏 ACTION 的事件回调函数为 <b>eventSubstance</b>。在配置 ACTION-item 时被一并配置，根据ACTION类型不同会有所不同。

## Props Api

```javascript

interface IProps  {
  dispatch: Dispatch;

  columns: ColumnsType<ColumnsTypeMine>;   // 表格列头
  dataSource: any[];                       // 表格数据
  rowKey?: string | undefined;             // 自定义关键参数 default: id
  isShowPagination?: boolean;              // 是否显示分页组件
  defaultFirstPage?: number | undefined;   // 默认开始页码
  pageCurrent?: number | undefined;        // 当前页码
  pageTotal?: number | undefined;          // 总页码数
  pageLimit?: number | undefined;          // 单页数据数量
  pageSizeOptions?: string[] | undefined;  // 单页数量变更

  onPaginationChange?: ((page: number, pageSize: number) => void) | undefined;
  onPaginationShowSizeChange?: ((current: number, size: number) => void) | undefined;
  ALLEVENTCallback?: ALLEVENTCallbackType; // 公共回调函数 (可用于解决column-render组合任何组件的无限触发事件回调)

  reloadApiTable?: TableProps<any>;        // antd - table - api
  reloadApiPagination?: PaginationProps;   // antd - pagination- api
}

```




