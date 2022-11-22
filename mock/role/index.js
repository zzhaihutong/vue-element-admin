const Mock = require('mockjs')
const { deepClone } = require('../utils')
const { asyncRoutes, constantRoutes } = require('./routes.js')

const routes = deepClone([...constantRoutes, ...asyncRoutes])

const roles = [{
        key: 'admin',
        name: 'admin',
        description: '超级管理员,可以访问所有页面。',
        routes: routes
    },
    {
        key: 'zzh',
        name: 'zzh',
        description: '超级管理员,可以访问所有页面。',
        routes: routes
    },
    {
        key: 'lyq',
        name: 'lyq',
        description: '超级管理员,可以访问所有页面。',
        routes: routes
    },
    {
        key: 'editor',
        name: 'editor',
        description: 'Normal Editor. Can see all pages except permission page',
        routes: routes.filter(i => i.path !== '/permission') // just a mock
    },
    {
        key: 'visitor',
        name: 'visitor',
        description: 'Just a visitor. Can only see the home page and the document page',
        routes: [{
            path: '',
            redirect: 'dashboard',
            children: [{
                path: 'dashboard',
                name: 'Dashboard',
                meta: { title: 'dashboard', icon: 'dashboard' }
            }]
        }]
    }
]

module.exports = [
    // mock get all routes form server
    {
        url: '/vue-element-admin/routes',
        type: 'get',
        response: _ => {
            return {
                code: 20000,
                data: routes
            }
        }
    },

    // mock get all roles form server
    {
        url: '/vue-element-admin/roles',
        type: 'get',
        response: _ => {
            return {
                code: 20000,
                data: roles
            }
        }
    },

    // add role
    {
        url: '/vue-element-admin/role',
        type: 'post',
        response: {
            code: 20000,
            data: {
                key: Mock.mock('@integer(300, 5000)')
            }
        }
    },

    // update role
    {
        url: '/vue-element-admin/role/[A-Za-z0-9]',
        type: 'put',
        response: {
            code: 20000,
            data: {
                status: 'success'
            }
        }
    },

    // delete role
    {
        url: '/vue-element-admin/role/[A-Za-z0-9]',
        type: 'delete',
        response: {
            code: 20000,
            data: {
                status: 'success'
            }
        }
    }
]