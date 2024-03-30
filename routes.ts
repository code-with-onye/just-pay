/**
 * An array of routes that are accessible to the public
 * These routes do not require authentication
 * @type {string[]}
 */

export const publicRoutes = [
    "/", "/api/user", "/api/uploadthing",
]

/**
 * An array of routes that are accessible to the public
 * These routes will redirect logged in users to /admin
 * @type {string[]}
 */

export const authRoutes = [
    "/signin",
    "/signup",
]

/**
 * The prefix for API authentication routes
 * Routes that start withthis prefix are used for api
 * @type {string}
 */
export const apiAuthPrefix = "/api/auth"

/**
 * The default redirect for logged in users
 * @type {string}
 */
export const DEFAULT_LOGIN_REDIRECT = "/overview"