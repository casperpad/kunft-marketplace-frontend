import React from 'react'
import {
  withRouter as withNextRouter,
  useRouter as useNextRouter,
} from 'next/router'
import queryString from 'query-string'

/**
 * Given a string such as:
 *
 * https://example.com/foo?bar=zip&name=Sam
 *
 * Will return:
 *
 * {
 *   bar: 'zip',
 *   name: 'Sam',
 * }
 */
const queryFromUrl = (url) => {
  // const [, ...queryStrings] = url.split('?')
  // const queryString = queryStrings.join('?')
  // const query = {}

  // // eslint-disable-next-line no-restricted-syntax
  // for (const [key, value] of new URLSearchParams(queryString).entries()) {
  //   query[key] = value
  // }

  const { query } = queryString.parseUrl(url)

  return query
}

const extractQueryFromRouter = (router) => ({
  ...queryFromUrl(router.asPath),
  ...router.query,
})

/**
 * Provide a router provider which ensures router.query is always correctly
 * hydrated on the first render even when statically optimised to avoid [this
 * caveat from the docs](https://nextjs.org/docs/routing/dynamic-routes):
 *
 * > Pages that are statically optimized by Automatic Static Optimization will
 * > be hydrated without their route parameters provided, i.e `query` will be an
 * > empty object (`{}`).
 *
 * Also injects a `.query` paramter to the `context` in `getInitialProps` making
 * it more useful than the existing `.asPath`
 *
 * Usage is identical to `import { withRouter } from 'next/router';
 *
 * Modified from https://github.com/zeit/next.js/issues/4804#issuecomment-541420735
 */
export const withRouter = (ComposedComponent) => {
  const WithPageRouteWrapper = withNextRouter(({ router, ...props }) => {
    router.query = extractQueryFromRouter(router)

    // eslint-disable-next-line react/jsx-filename-extension
    return <ComposedComponent {...props} router={router} />
  })

  if (ComposedComponent.getInitialProps) {
    WithPageRouteWrapper.getInitialProps = (context, ...args) => {
      context.query = extractQueryFromRouter(context)
      return ComposedComponent.getInitialProps(context, ...args)
    }
  }

  if (process.env.NODE_ENV !== 'production') {
    const name =
      ComposedComponent.displayName || ComposedComponent.name || 'Unknown'
    WithPageRouteWrapper.displayName = `withPageRouter(${name})`
  }

  return WithPageRouteWrapper
}

/**
 * Provide a router hook which ensures router.query is always correctly hydrated
 * on the first render even when statically optimised to avoid [this caveat from
 * the docs](https://nextjs.org/docs/routing/dynamic-routes):
 *
 * > Pages that are statically optimized by Automatic Static Optimization will
 * > be hydrated without their route parameters provided, i.e `query` will be an
 * > empty object (`{}`).
 *
 * Usage is identical to `import { useRouter } from 'next/router';
 */
export const useRouter = () => {
  const router = useNextRouter()
  router.query = extractQueryFromRouter(router)
  return router
}
