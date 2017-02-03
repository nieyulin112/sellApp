import familyConcatIndex from '../views/FamilyConcat/IndexView.vue'
import addConcat from '../views/FamilyConcat/AddConcatView.vue'
import delConcat from '../views/FamilyConcat/DelConcatView.vue'
export default [{
    path: '/familyConcat/index', // 家庭联系人列表
    name: 'familyConcat',
    meta: {
        title: '家庭联系人',
        auth: {
            fail (next) {
                next({
                    path: '/beforeLogin',
                    query: {
                        from: '/familyConcat/index'
                    }
                })
            }
        },
        channelCheck: {
            fail: false
        }
    },
    component: familyConcatIndex
}, {
    path: '/familyConcat/addConcat', // 添加联系人
    name: 'addConcat',
    meta: {
        title: '添加联系人',
        auth: {
            fail (next) {
                next({
                    path: '/beforeLogin',
                    query: {
                        from: '/familyConcat/addConcat'
                    }
                })
            }
        },
        channelCheck: {
            fail: false
        }
    },
    component: addConcat
}, {
    path: '/familyConcat/delConcat/:id', // 删除联系人
    name: 'delConcat',
    meta: {
        title: '联系人信息'
    },
    component: delConcat
}]
