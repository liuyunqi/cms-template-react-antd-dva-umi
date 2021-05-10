
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
