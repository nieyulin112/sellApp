import configApp from '../ConfigApp'
import Routers from './routers'
import stores from './vuex'
import {isPrd} from 'utils'
import {pv} from './apis/common.api'

const cfg = {
    stores: stores,
    router: {
        routes: [...Routers],
        beforeEach: [(to, from, next) => {
            pv()
            next()
        }]
    },
    urlTables () {
        const tables = {
            'default': '/hmcp-hp'
        }
        if (isPrd()) {
            return {
                ...tables
            }
        } else {
            return {
                ...tables
            }
        }
    }
}
configApp(cfg)
