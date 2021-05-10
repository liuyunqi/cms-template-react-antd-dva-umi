import React, { useState, useEffect } from 'react';
import { Modal, Input, Tree, Spin, notification } from 'antd';
import ssoService from '../service';
import { getOrgTreeNodeByLevelType, treeData, TreeProps, treeNodesType } from '../type';
import { recursionTreeData, getParentKey } from '../utils';
import styles from './index.less';

const { Search } = Input;

let dataList: any[] = [];
const generateList = (data: treeData[]) => {
  for (let i = 0; i < data.length; i++) {
    const node = data[i];
    const { key } = node;
    dataList.push({ key, title: node.title, pid: node.pid, hierarchy: node.hierarchy });
    if (node.children) {
      generateList(node.children);
    }
  }
};

const TransferModal: React.FC<TreeProps> = ({
  disabled = false,
  dataSource,
  storeDataSource,
  selectHierarchy,
  staffCode,
  storeCode,
  onOk,
  ...props
}) => {
  // 初始化数据
  const [initData, setInitData] = useState<string[]>([]);
  // 选中的节点 -受控
  const [checkedKeys, setCheckedKeys] = useState<string[]>([]);
  // 选中的片区级数据
  const [targetKeys, setTargetKeys] = useState<any[]>([]);
  // 选中的门店数据 -受控
  const [storeData, setStoreData] = useState<{ storeCode: string; storeName: string; pid?: string }[]>([]);
  // 树的数据源
  const [treeData, setTreeData] = useState<treeNodesType[]>([]);
  // 搜索关键字
  const [searchValue, setSearchValue] = useState('');
  // 选中的节点
  const [expandedKeys, setExpandedKeys] = useState<any[]>([]);
  // 是否自动展开父节点
  const [autoExpandParent, setAutoExpandParent] = useState(false);
  // 加载状态
  const [loading, setLoading] = useState<boolean>(true);
  //控制片区全选集合
  const [allSelectKeys, setAllSelectKeys] = useState<any[]>([]);

  useEffect(() => {
    // 初始化数据暂时只有片区级数据使用到
    if (dataSource && dataSource.length > 0) {
      setInitData(dataSource);
    }
    queryOrgTreeNodeByLevel();
  }, []);

  const queryOrgTreeNodeByLevel = async () => {
    dataList = [];
    let params: getOrgTreeNodeByLevelType = {
      levelQuery: {
        storeCode: storeCode ? storeCode : '',
        userCode: storeCode ? '' : staffCode,
        orgCode: '',
        hierarchyList: selectHierarchy === '06' ? ['01', '02', '03', '04', '06'] : ['01', '02', '03', '04', '06', '07'],
      },
    };
    try {
      let result = await ssoService.getOrgTreeNodeByLevel(params);
      if (result.length > 0) {
        setTreeData(recursionTreeData(result[0].sub, selectHierarchy));
        generateList(recursionTreeData(result[0].sub, selectHierarchy));
        setLoading(false);

        if (selectHierarchy === '07' && dataList.length && storeDataSource && storeDataSource.length) {
          let newAllSelectKeys: string[] = [];
          let newTargetData = dataList.filter((_) => storeDataSource.includes(_.key)).map((l) => l.pid);
          for (let i = 0; i < newTargetData.length; i++) {
            let items = newTargetData[i];
            if (!newAllSelectKeys.includes(items)) newAllSelectKeys.push(items);
          }
          setAllSelectKeys([...newAllSelectKeys]);
          setStoreData(storeDataSource);

          //
          const storeMap = storeDataSource.map((list) => list.storeCode);
          setCheckedKeys(storeMap);
        }
        if (dataSource && dataSource.length) {
          setCheckedKeys(dataSource);
          if (selectHierarchy === '06') {
            let _area = props._area || [];
            setTargetKeys([...new Set([..._area, ...dataSource])]);
            setCheckedKeys([...new Set([..._area, ...dataSource])]);
          }
        }
        // 此处用于巡检表未被使用，再次选择时可以取消选择已有的数据
        if (!dataSource.length && props._area && props._area.length > 0 && selectHierarchy === '06') {
          setTargetKeys([...new Set([...props._area])]);
          setCheckedKeys([...new Set([...props._area])]);
        }
      }
    } catch (error) {
      notification.error({
        message: '请求错误',
        description: error.message || '组织树请求失败',
      });
    }
  };

  const onSearch = (value: string) => {
    const expandedKeys = dataList
      .map((item) => {
        if (item.title.indexOf(value) > -1) {
          return getParentKey(item.key, treeData);
        }
        return null;
      })
      .filter((item, i, self) => item && self.indexOf(item) === i);
    setExpandedKeys(expandedKeys);
    setSearchValue(value);
    setAutoExpandParent(true);
  };

  const handleOk = () => {
    // 片区级数据回调
    if (selectHierarchy === '06') {
      onOk([...new Set([...targetKeys])]);
    }
    // 门店级数据回调
    if (selectHierarchy === '07') {
      onOk([...new Set([...storeData])]);
    }
  };

  /**
   * 	展开/收起节点时触发
   */
  const onExpand = (expandedKeys: any[]) => {
    setExpandedKeys(expandedKeys);
    setAutoExpandParent(false);
  };

  const loop = (data: any) => {
    return data.map((list: any) => {
      const index = list.title.indexOf(searchValue);
      const beforeStr = list.title.substr(0, index);
      const afterStr = list.title.substr(index + searchValue.length);
      let title = null;
      let _disabled = false;
      if (selectHierarchy === '06') {
        if (dataSource && dataSource.includes(list.key)) {
          _disabled = true;
        }
      }
      if (_disabled) {
        title = <span style={{ color: '#999', cursor: 'no-drop' }}>{list.title}</span>;
      } else if (index > -1) {
        title = (
          <span>
            <span>
              {beforeStr}
              <span className="activeText">{searchValue}</span>
              {afterStr}
            </span>
          </span>
        );
      } else {
        title = <span>{list.title}</span>;
      }

      if (list.children) {
        return {
          title,
          storeName: list.title,
          key: list.key,
          disabled: list.disabled,
          pid: list.pid,
          hierarchy: list.hierarchy,
          children: loop(list.children),
        };
      }
      return {
        title,
        storeName: list.title,
        disabled: list.disabled,
        pid: list.pid,
        hierarchy: list.hierarchy,
        key: list.key,
      };
    });
  };

  /**
   * 复选框点击事件
   */
  const onCheck = (selectValue: any, { checkedNodes, node, ...rest }: any) => {
    // 门店级数据
    if (selectHierarchy === '07') {
      let checkedKeysMap: string[] = [];
      let storeMap: any[] = [];
      if (checkedNodes.length > 0) {
        checkedNodes.map((item: any) => {
          if (item.hierarchy === '07') {
            storeMap.push({
              pid: item.pid,
              storeCode: item.key,
              storeName: item.storeName,
            });
          }
          checkedKeysMap.push(item.key);
        });
      }
      setCheckedKeys(checkedKeysMap);
      setStoreData(storeMap);
    }
    // 片区级数据
    if (selectHierarchy === '06') {
      let checkedKeysMap: string[] = [];
      let targetMap: string[] = [];
      if (checkedNodes.length > 0) {
        checkedNodes.map((item: any) => {
          if (item.hierarchy === '06') {
            targetMap.push(item.key);
          }
          checkedKeysMap.push(item.key);
        });
      }
      // 片区级数据，因为在编辑时不能移除已选中的数据，需要合并
      setCheckedKeys([...new Set([...initData, ...checkedKeysMap])]);
      setTargetKeys([...new Set([...initData, ...targetMap])]);
    }
  };
  return (
    <Modal visible={true} {...props} maskClosable={false} className={styles.transferModal} onOk={() => handleOk()}>
      <Spin spinning={loading}>
        <div className={styles.treeWrap}>
          <Search autoFocus onSearch={(value: string) => onSearch(value)} />
          <Tree
            checkable
            blockNode
            disabled={disabled}
            selectedKeys={[]}
            autoExpandParent={autoExpandParent}
            checkedKeys={checkedKeys}
            expandedKeys={expandedKeys} //（受控）展开指定的树节点
            onExpand={onExpand}
            height={500}
            treeData={loop(treeData)}
            onCheck={onCheck}
          />
        </div>
      </Spin>
    </Modal>
  );
};

export default TransferModal;
