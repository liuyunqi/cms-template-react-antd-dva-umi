
export * from './invoicesReview'
export * from './companyReplenishList'
export * from './invoicesDetails'
export * from './arrivalDetails'
export * from './createrDispatchGoods'
export * from './transferCargo'



/*

create table logis_askorderlist3
(
   uuid                 varchar(40) not null comment 'UUID',
   bill_code            varchar(30) comment '请货单号',
   STORE_CODE           varchar(10) comment '门店编码',
   ROW_NUM              int comment '行号',
   GOOD_CODE            varchar(10) comment '商品编码',
   sales_forecast       decimal(10,1) comment '预测销量',
   ADVICE_COUNT         decimal(10,1) comment '建议数量',
   SUMBER_COUNT         decimal(10,1) comment '门店确认提交的数量',
   MAX_COUNT            decimal(10,1) comment '最大请货数量',
   top_limit            decimal(10,1) comment '上限数量',
   stock_qty            decimal(10,1) comment '库存数量',
   low_limit            decimal(10,1) comment '下限数量',
   middle_pack_num      decimal(10,1) comment '中包装数量',
   pc_pack_num          decimal(10,1) comment '件包装数量',
   EXAMINE_COUNT        decimal(10,1) comment '总部审核通过的数据',
   EXAMINE_DES          varchar(50) comment '审核说明',
   LOT_NUM              varchar(20) comment '批号',
   COST_PRICE           decimal(11,2) comment '成本价',
   RETAIL_PRICE         decimal(11,2) comment '零售价',
   SAP_SATISFY_COUNT    decimal(10,1) not null comment 'SAP配送单产生满足数量
            数据库表设计时是否分表？',
   WARE_OUTPUT_COUNT    decimal(10,1) not null comment 'WMS仓库实际发货数量',
   RECEIVING_COUNT      decimal(10,1) not null comment 'POS配送单与交货单产生的收货数量',
   ACCEPTANCE_COUNT     decimal(10,1) not null comment 'POS验收时产生',
   DIFFERENCE_QUANTITY  decimal(10,1) not null comment 'POS只有有差异的才会产生',
   REFER_BILL_TYPE      varchar(20) comment '参考单类型',
   REFER_BILL_CODE      varchar(30) comment '参考单据号',
   REFER_BILL_ROW_NUM   int comment '参考单据行项目号',
   CHINESE_MEDICINE_MANUFACTURER varchar(100) comment '厂家',
   CHINESE_MEDICINE_LOCALITY varchar(100) comment '产地',
   INPUTER              varchar(20) not null comment '录入人',
   INPUT_TIME           datetime not null comment '录入时间',
   LAST_MODIFIER        varchar(20) not null comment '最后修改人',
   LAST_MODIFY_TIME     datetime not null comment '最后修改时间',
   goods_label          varchar(100) comment '商品标签',
   count_note           blob comment '计算过程',
   primary key (uuid)
);

*/