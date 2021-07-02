import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Layout from '../views/layout/Layout.vue'

Vue.use(VueRouter)

const routes = [
  // 登陆
  {
    path: '/Login',
    name: '/Login',
    component: () => import('../views/login/Login'),
    meta: {
      title: '登陆',
      index: '/Login',
    }
  },
  // 注册
  {
    path: '/Registered',
    name: 'Registered',
    component: () => import('../views/registered/Registered.vue'),
    meta: {
      title: '注册',
      index: '/Registered',
    }
  },
  // 父路由
  {
    path: '',
    component: Layout,
    children: [
      // 首页
      {
        path: '/',
        name: 'Home',
        component: Home,
        meta: {
          title: '首页',
          index: '/',
        }
      },
      // 已发布
      {
        path: '/Published',
        name: 'Published',
        component: () => import('../views/published/Published'),
        meta: {
          title: '已发布',
          index: '/Published'
        }
      },

      // 文章编辑
      {
        path: '/Editor',
        name: 'Editor',
        component: () => import('../views/editor/Editor.vue'),
        meta: {
          title: '文章编辑',
          index: '/Published'

        }
      },
      // 文章详情
      {
        path: '/Details',
        name: 'Details',
        component: () => import('../views/details/Details'),
        meta: {
          title: '文章详情',
          index: '/Published'
        }
      },

      // 标签页
      {
        path: '/Label',
        name: 'Label',
        component: () => import('../views/label/Label.vue'),
        meta: {
          title: '标签页',
          index: '/Label',
        }
      },
      // 导出表格
      {
        path: '/Excel',
        name: 'Excel',
        component: () => import('../views/excel/Excel.vue'),
        meta: {
          title: '导出表格',
          index: '/Excel',
        }
      },
      // 上传图片
      {
        path: '/ImgUpload',
        name: 'ImgUpload',
        component: () => import('../views/imgupload/ImgUpload.vue'),
        meta: {
          title: '上传图片',
          index: '/ImgUpload',
        }
      },
      // 退出系统
      {
        path: '/LogOut',
        name: 'LogOut',
        component: () => import('../views/logout/LogOut.vue'),
        meta: {
          title: '退出系统',
          index: '/LogOut',
        }
      },
      // 统计
      {
        path: '/Statistical',
        name: 'Statisticalout',
        component: () => import('../views/statistical/Statistical.vue'),
        meta: {
          title: '统计',
          index: '/Statistical',
        }
      },
      // 发表文章
      {
        path: '/Release',
        name: 'Release',
        component: () => import('../views/release/Release.vue'),
        meta: {
          title: '发表文章',
          index: '/Release',
        }
      },
    ]
  },
  // 404路由
  {
    path: '*',
    name: '404',
    component: () => import('../views/404/404.vue'),
    meta: {
      title: '页面不存在',
      index: '*',

    }
  }



]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// 路由全局守卫
router.beforeEach((to, from, next) => {

  // 网页标题
  document.title = to.meta.title


  // 判断用户是否登录，没有登陆就前往登陆页 登陆就可以进行下一步
  // 本地获取用户名是否在登陆页 name
  let name = localStorage.getItem('obj1')

  if (to.path === '/Login' || to.path === '/Registered') {
    // console.log(22);
    next()
  } else {
    // console.log(11);
    name ? next() : next('/Login')
  }
})
export default router

