// 修改tree中的某个字段
export function setItemByKey(tree, key, value) {
  tree[key] = value;
  (tree.children || []).forEach(e => {
    setItemByKey(e, key, value)
  })
  return tree
}

// 获取叶子节点
export function getLeafItemList(tree) {
  let itemList = []
  function mapTree (tree) {
    if (!tree.children || tree.children.length === 0) {
      itemList.push(Object.assign({ ...tree }))
    } else {
      tree.children.forEach(e => {
        mapTree(e)
      })
    }
  }
  // 因为这个里根节点是数组
  tree.forEach(e => {
    mapTree(e)
  })
  return itemList
}
