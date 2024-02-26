import express, { Router } from 'express'
// import docsRoute from '../swagger.route'
import userRoute from './user'
import authRoute from './auth'
import explorerRoute from './explorer'
import recentlyRoute from './recently'
import languageRoute from './language'
import imageRoute from './image'
import tourRoute from './tour'
import tourVisitRoute from './tourVisit'
const router = express.Router()

interface IRoute {
  path: string
  route: Router
}

const defaultIRoute: IRoute[] = [
  {
    path: '/users',
    route: userRoute,
  },
  {
    path: '/auths',
    route: authRoute,
  },
  {
    path: '/explorers',
    route: explorerRoute,
  },
  {
    path: '/recently',
    route: recentlyRoute,
  },
  {
    path: '/languages',
    route: languageRoute,
  },
  {
    path: '/languages',
    route: languageRoute,
  },
  {
    path: '/images',
    route: imageRoute,
  },
  {
    path: '/tours',
    route: tourRoute,
  },
  {
    path: '/tourVisits',
    route: tourVisitRoute,
  },
]

// const devIRoute: IRoute[] = [
//   // IRoute available only in development mode
//   {
//     path: '/docs',
//     route: docsRoute,
//   },
// ]

defaultIRoute.forEach(route => {
  router.use(route.path, route.route)
})

// /* istanbul ignore next */
// if (env.envName === 'dev') {
//   devIRoute.forEach(route => {
//     router.use(route.path, route.route)
//   })
// }

export default router
