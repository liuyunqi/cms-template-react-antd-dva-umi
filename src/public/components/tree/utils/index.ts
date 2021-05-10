/**
 *
 * @param treeData
 * @param select
 * @param pid
 * @returns
 */
export const recursionTreeData = (treeData: any[], select: string, pid?: string) => {
  let nodeData: any[] = [];
  treeData.forEach((item) => {
    if (item.hierarchy === '04' && !item.sub) {
      return;
    } else {
      let newObj: any = {};
      if (item.sub) {
        newObj.children = recursionTreeData(item.sub, select, item.code);
      }
      newObj.key = item.hierarchy === select && select === '07' ? item.storeCode || item.code : item.code;
      newObj.title = item.name;
      newObj.hierarchy = item.hierarchy;
      if (pid) newObj.pid = pid;
      nodeData.push(newObj);
    }
  });
  return nodeData;
};

export const getParentKey = (key: string, tree: any): string | undefined => {
  let parentKey;
  for (let i = 0; i < tree.length; i++) {
    const node = tree[i];
    if (node.children) {
      if (node.children.some((item: any) => item.key === key)) {
        parentKey = node.key;
      } else if (getParentKey(key, node.children)) {
        parentKey = getParentKey(key, node.children);
      }
    }
  }
  return parentKey;
};
