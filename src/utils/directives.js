import Vue from 'vue'
import store from '../store'

let zIndex = 1000
// v-dialogDrag: 弹窗拖拽属性
Vue.directive('drag', {
  bind(el, binding, vnode, oldVnode) {
    const dialogHeaderEl = el.querySelector('.znv-dialog__header') || el.querySelector('.sub-small-title')
    const dragDom = el
    dragDom.style.zIndex = zIndex++
    dialogHeaderEl.style.cssText += ';cursor:move;'
    dialogHeaderEl.onmousedown = function (ev) {
      const disX = ev.clientX - dragDom.offsetLeft
      const disY = ev.clientY - dragDom.offsetTop
      dragDom.style.zIndex = zIndex++
      // 判断是否有hik视频
      let videoEl = el.querySelector('.playWnd')
      document.onmousemove = function (ev) {
        let l = ev.clientX - disX
        let t = ev.clientY - disY
        if (l < 0) {
          l = 0
        } else if (l > (3840 - dragDom.offsetWidth)) {
          l = 3840 - dragDom.offsetWidth
        }
        if (t < 0) {
          t = 0
        } else if (t > (1080 - dragDom.offsetHeight)) {
          t = 1080 - dragDom.offsetHeight
        }
        dragDom.style.left = l + 'px'
        dragDom.style.top = t + 'px'
        // 如果有hik视频
        if (videoEl) {
          store.dispatch('view/setIntegration', {
            msgId: 'znv-0001',
            componentId: videoEl.id
          })
        }
      }
      document.onmouseup = function () {
        document.onmousemove = null
        document.onmouseup = null
      }
    }
  }
})

Vue.directive('clickToBig', {
  // 初始化指令
  bind(el, binding, vnode) {
    function clickHandler(e) {
      // 判断指令中是否绑定了函数
      // if (binding.expression) {
      //   // 如果绑定了函数 则调用那个函数，此处binding.value就是handleClose方法
      //   binding.value(e)
      // }
      if (!document.getElementById('bigImgNode')) {
        let bigImgNode = document.createElement('img')
        bigImgNode.src = el.currentSrc
        bigImgNode.id = 'bigImgNode'
        if (binding.value.callback) {
          binding.value.callback(true)
        }

        let bigImgBox = document.createElement('div')
        bigImgBox.className = 'big-img-box'
        bigImgBox.id = 'bigImgBox'
        bigImgBox.appendChild(bigImgNode)
        document.body.appendChild(bigImgBox)
        bigImgBox.addEventListener('click', (event) => {
          bigImgBox.style.display = 'none'
          if (binding.value.callback) {
            binding.value.callback(false)
          }
        })
      } else {
        let bigImgBox = document.getElementById('bigImgBox')
        bigImgBox.style.display = 'block'
        let bigImgNode = document.getElementById('bigImgNode')
        bigImgNode.src = el.currentSrc
        if (binding.value.callback) {
          binding.value.callback(true)
        }
      }
    }
    el.__vueClickOutside__ = clickHandler
    el.addEventListener('click', clickHandler)
  },
  update() {},
  unbind(el, binding) {
    // 解除事件监听
    el.removeEventListener('click', el.__vueClickOutside__)
    delete el.__vueClickOutside__
  }
})
