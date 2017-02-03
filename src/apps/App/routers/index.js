import HosRoutes from './hos.route'
import FamilyRoutes from './family.route'
import IsRoutes from './is.route'
import Login from './login.route'
import Index from './index.route'
import {isPrd} from 'utils'

function getIndex () {
    if (isPrd()) {
        return []
    } else {
        return Index
    }
}
import Fast from './fast.route'
export default [
    ...HosRoutes,
    ...FamilyRoutes,
    ...IsRoutes,
    ...Login,
    ...getIndex(),
    ...Index,
    ...Fast
]
