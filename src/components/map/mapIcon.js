export let mapIcon = [
  {
    label: '区委',
    name: '区委',
    icon: require('../../assets/mapIcon/区委@2x.png'),
    isShow: true
  },
  {
    label: '区党建服务中心',
    name: '区党建服务中心',
    icon: require('../../assets/mapIcon/区党建服务中心@2x.png'),
    isShow: true
  },
  {
    label: '二级党建服务中心',
    name: '二级党建服务中心',
    icon: require('../../assets/mapIcon/二级党建服务中心@2x.png'),
    isShow: true
  },
  {
    label: '党建服务站',
    name: '党建服务站',
    icon: require('../../assets/mapIcon/党建服务站@2x.png'),
    isShow: true
  }
]

function getItemByName(tree, name) {
  if (tree.name === name) {
    return tree
  }
  ;(tree.children || []).forEach((e) => {
    getItemByName(e, name)
  })
}

export function getIconByName(name) {
  let icon = ''
  mapIcon.some((e) => {
    let item = getItemByName(e, name)
    if (item) {
      icon = item.icon
      return true
    }
  })
  return icon
}
