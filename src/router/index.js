import Vue from 'vue'
import Router from 'vue-router'
// import Home from '@/views/Home.vue'
// import SopManage from '@/views/SopManage.vue'
// import MemberManage from '@/views/MemberManage.vue'
// import HistoryManage from '@/views/HistoryManage.vue'
// import StandardInfoManage from '@/views/StandardInfoManage.vue'
// import NoticeManage from '@/views/NoticeManage.vue'
// import {
//   SopList,
//   SopEdit,
//   SopRun,
//   MemberGroup,
//   FireBrigade,
//   Partner,
//   SopHistory,
//   SmsHistory,
//   SensorHistory,
//   LocationInfo,
//   SensorType,
//   StandardSms,
//   StandardBroad,
//   PublicCode,
//   SystemUser
// } from '@/views/subs'

Vue.use(Router)

const requireAuth = () => (from, to, next) => {
  if (sessionStorage.userInfo) return next()
  next('/login')
}

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      // component: Home,
      component: () => import('@/views/Home.vue'),
      beforeEnter: requireAuth()
    },
    {
      path: '/sopmanage',
      name: 'sop-manage',
      // component: SopManage,
      component: () => import('@/views/SopManage.vue'),
      children: [
        {
          path: 'soplist',
          name: 'sop-list',
          component: () => import('@/views/subs/SopList.vue')
        },
        {
          path: 'sopedit',
          name: 'sop-edit',
          component: () => import('@/views/subs/SopEdit.vue')
          // component: SopEdit
        },
        {
          path: 'soprun',
          name: 'sop-run',
          component: () => import('@/views/subs/SopRun.vue')
          // component: SopRun
        }
      ]
    },
    {
      path: '/membermanage',
      name: 'member-manage',
      // component: MemberManage,
      component: () => import('@/views/MemberManage.vue'),
      children: [
        {
          path: 'membergroup',
          name: 'membergroup',
          component: () => import('@/views/subs/MemberGroup.vue')
          // component: MemberGroup
        },
        {
          path: 'firebrigade',
          name: 'firebrigade',
          component: () => import('@/views/subs/FireBrigade.vue')
          // component: FireBrigade
        },
        {
          path: 'partner',
          name: 'partner',
          component: () => import('@/views/subs/Partner.vue')
          // component: Partner
        }
      ]
    },
    {
      path: '/historymanage',
      name: 'history-manage',
      // component: HistoryManage,
      component: () => import('@/views/HistoryManage.vue'),
      children: [
        {
          path: 'sophistory',
          name: 'sophistory',
          component: () => import('@/views/subs/SopHistory.vue')
          // component: SopHistory
        },
        {
          path: 'smshistory',
          name: 'smshistory',
          component: () => import('@/views/subs/SmsHistory.vue')
          // component: SmsHistory
        },
        {
          path: 'sensorhistory',
          name: 'sensorhistory',
          component: () => import('@/views/subs/SensorHistory.vue')
          // component: SensorHistory
        }
      ]
    },
    {
      path: '/standardinfomanage',
      name: 'standard-info-manage',
      // component: StandardInfoManage,
      component: () => import('@/views/StandardInfoManage.vue'),
      children: [
        {
          path: 'locationinfo',
          name: 'location-info',
          component: () => import('@/views/subs/LocationInfo.vue')
          // component: LocationInfo
        },
        {
          path: 'sensortype',
          name: 'sensor-type',
          component: () => import('@/views/subs/SensorType.vue')
          // component: SensorType
        },
        {
          path: 'standardsms',
          name: 'standard-sms',
          component: () => import('@/views/subs/StandardSms.vue')
          // component: StandardSms
        },
        {
          path: 'standardbroad',
          name: 'standard-broad',
          component: () => import('@/views/subs/StandardBroad.vue')
          // component: StandardBroad
        },
        {
          path: 'publiccode',
          name: 'public-code',
          component: () => import('@/views/subs/PublicCode.vue')
          // component: PublicCode
        },
        {
          path: 'notice',
          name: 'notice-manage',
          component: () => import('@/views/NoticeManage.vue')
          // component: NoticeManage
        },
        {
          path: 'systemuser',
          name: 'system-user',
          component: () => import('@/views/subs/SystemUser.vue')
          // component: SystemUser
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      meta: {
        layout: 'login'
      }
    },
    {
      path: '*',
      name: 'error',
      meta: {
        layout: 'notfound'
      }
    }
  ]
})
