import { isEmpty, debounce, includes, lowerFirst, forEach } from 'lodash'
import Cookie from 'js-cookie'
import { Base64 } from 'js-base64'
import Vue from 'vue'

import { ROOT_URL, ROOT_URI, PROCESSING_STEP_LIST, PROCESSING_ROUTER_LIST } from '@/constants'

export default (store, router, moduleName = 'index') => {
  // 退出登录的处理函数
  // eslint-disable-next-line no-unused-vars
  function fnLogout(cb) {
    let user = store.state.user.info
    const { tag, alias } = user
    const isInApp = store.getters['system/isInApp']

    user = {}
    Cookie.set('http_usertoken', '');
    Cookie.set('ZATECH1000100', '');
    localStorage.removeItem('loginCookie')
    if (isInApp) {
      Promise.all([Vue.jsbridge.removeNotificationTag(tag),
        Vue.jsbridge.removeNotificationAlias(alias)]).then(() => {
        cb({ name: 'login', replace: true })
      })
    } else {
      cb({ name: 'login', replace: true })
    }
  }

  // 需要授权的页面，如果发现用户信息为空，就跳转到登录页面
  const sniffRoute = (isFreeAuth, to, from, cb) => {
    const userData = store.state.user
    const userInfo = store.state.user.info

    const { isAllowedLogin, isAllowedMsg } = userData
    const { extensionCode, shared } = to.query

    // 如果路由里面有 邀请码 extensionCode 表示是分享出来的邀请注册链接
    // 如果页面路由里面 shared 为 true 表示是分享的页面
    // 或者当前页面是免登陆的 isFreeAuth 为true
    // 则忽视掉后续的处理逻辑
    if (!isEmpty(extensionCode) || shared === 'true' || isFreeAuth) {
      cb(true)
      return
    }

    // 如果用户没有登录
    if (isEmpty(userInfo)) {
      // alert(`http_ostype:${isInApp}`)
      const { name, query } = to
      if (moduleName === 'index') {
        cb({
          name: 'login',
          query: {
            fromUrl: name,
            ...query,
          },
        })
      } else {
        const fromUrl = router.resolve({ name: to.name, query: { ...to.query } }).href
        const toFullPath = Base64.encode(`${ROOT_URL}${fromUrl}`)
        window.location.href = `${ROOT_URI}/index/login?modules=${moduleName}&fromUrl=${toFullPath}`
      }
      return
    }

    // ==============
    // 走到这一步表示已经登陆了，以下的所有页面都必须登录之后才能查看
    // ==============

    // ==============
    // 首先---校验用户是否可以登录
    // ==============
    // 判断用户是否离职  jobState !== '1'；六大人员属性是否为空
    // 否则退出登录状态
    if (!isAllowedLogin) {
      Vue.$vux.alert.show({
        title: '温馨提示',
        content: isAllowedMsg || '人员属性信息存在问题，请联系您的引荐人进行修改',
        onHide: () => {
          fnLogout(cb)
        },
      })
      return
    }

    // 如果跳转页面是【保险知识学习】则让跳转过去
    // 如果是【打开的推送消息、第三方页面的中转页】则直接跳转相应页面，绕过重定向逻辑
    // 如果跳转的页面是【审核状态】相关页面
    if (includes(['knowledgeInfo', 'messageDetail', 'SignResult', 'AuditSuccess', 'AuditFail'], to.name)) {
      cb(true)
      return
    }

    // 如果用户信息中 signStep 处于完善信息流程
    // 并且即将跳转的页面 to.name 不等于 完善代理人流程 路由名
    // ---比如进行到了答题页，但是跳转协议页，也要跳回答题页
    // 总之就是以后端传递过来的步骤为准
    // 则表示页面要跳转到 完善信息流程页面去
    if (includes(PROCESSING_STEP_LIST, userInfo.signStep)
    && !includes(PROCESSING_ROUTER_LIST, to.name)) {
      // 需要对index模块和 product模块做针对化处理
      if (moduleName === 'index') {
        cb({
          name: `${userInfo.signStep === 'Begin' ? 'CompleteInfo' : userInfo.signStep}`,
        })
      } else {
        window.location.href = `/app/index/${lowerFirst(userInfo.signStep)}`
        cb(false)
      }
      return
    }

    // signStep 为 null 表示认证流程已经走完 或者 认证流程没有走
    // studyAuth 表示 学习状态 0 未学习 1 学习流程没走完  2学习流程已经走完（不考虑成功or失败）
    // auditStatus 0 审核中  1 审核成功 2 审核失败
    // 如果认证流程已经结束, 并且学习状态不是未学习 并且审核状态有值
    // 则跳转审核状态页面
    const hasAuditStatus = includes(['0', '1', '2'], userInfo.auditStatus)
    if (userInfo.signStep === null && userInfo.studyAuth !== 0 && hasAuditStatus && moduleName === 'index') {
      let routeName = 'SignResult'
      if (userInfo.auditStatus === '1') {
        routeName = 'AuditSuccess'
      } else if (userInfo.auditStatus === '2') {
        routeName = 'AuditFail'
      }
      cb({
        name: routeName,
      })
      return
    }

    // 其他的情况都直接跳转
    cb(true)
  }

  router.beforeEach((to, from, next) => {
    // 中断请求
    // store.commit('cancelToken/clearToken')
    console.log(`to.name是：${to.name}`)
    const { isFreeAuth } = to.meta
    // 如果要跳转的页面是登陆页面，则不需要获取用户信息
    // 主要是为了处理退出登录的时候用户信息页面闪一下
    if (to.name === 'login') {
      next(true)
      return
    }
    // 如果localStorage里面有值，先从localStorage里面取出来，同步到cookie
    // 主要为了解决 安卓和IOS webview 强退会清除cookie的问题
    const loginCookie = localStorage.getItem('loginCookie')
    if (loginCookie) {
      Cookie.set('ZATECH1000100', loginCookie)
    }
    // 获取用户信息
    store.dispatch('user/getUserInfo').then(res =>
      // 如果获取到用户信息，判断是否有权限
      // 如果用户信息 info是空的，会在是否登录那校验住，不必在意这种情况
      (res && store.dispatch('user/checkUserAllowedLogin')),
    ).finally(() => {
      sniffRoute(isFreeAuth, to, from, next)
    })

    // 只有在刷新页面或者第一次进入App时候
    // 如果localStorage里面有值，先从localStorage里面取出来，同步到cookie
    // 主要为了解决ios微信强退会清除cookie的问题
    // if (from.matched.length === 0)
  })

  const hidePopUp = () => {
    // 路由跳转的时候关闭弹窗
    forEach(document.querySelectorAll('.vux-popup-mask'), (item) => {
      if (item.style.zIndex > 0) {
        item.click()
      }
    })
  }

  router.afterEach((to) => {
    hidePopUp()

    Vue.$vux.confirm.hide()
    Vue.$vux.toast.hide()
    Vue.$vux.alert.hide()

    window.scrollTo(0, 0)
    const title = to.meta.title || ''
    // 通过 pageTitleType 可以设置是否需要前端的title
    // pageTitleType的优先级高于pageTpye
    const pageType = to.query.pageTitleType || to.meta.pageType || 'normal'
    store.dispatch('commontitle/setTitleText', title)
    store.dispatch('commontitle/setType', pageType)
    // 所有弹窗隐藏
    store.dispatch('popup/hideAllDialog')
  })

  // router.onReady(() => {
  // Add router hook for handling asyncData.
  // Doing it after initial route is resolved so that we don't double-fetch
  // the data that we already have. Using router.beforeResolve() so that all
  // async components are resolved.
  router.beforeResolve((to, from, next) => { // eslint-disable-line
    // const title = to.meta.title || ''
    // const pageType = to.meta.pageType || 'normal'

    const matched = router.getMatchedComponents(to)
    const prevMatched = router.getMatchedComponents(from)
    let diffed = false
    const activated = matched.filter((c, i) => { //eslint-disable-line
      return diffed || (diffed = (prevMatched[i] !== c)) //eslint-disable-line
    })
    const asyncDataHooks = activated.map(c => c.asyncData).filter(_ => _)
    if (!asyncDataHooks.length) {
      // store.dispatch('commontitle/setTitleText', title)
      // store.dispatch('commontitle/setType', pageType)
      return next()
    }
    let loaded = false;
    const debouncedShowLoading = debounce(() => {
      if (!loaded) {
        Vue.$vux.loading.show({
          text: '数据加载中',
        })
      }
    }, 1000)
    debouncedShowLoading()
    Promise.all(asyncDataHooks.map(hook => hook({ store, route: to })))
      .then(() => {
        loaded = true
        // store.dispatch('commontitle/setTitleText', title)
        // store.dispatch('commontitle/setType', pageType)
        Vue.$vux.loading.hide()
        next()
      })
      .catch(next)
    // hideOptionMenu()
  })
}
