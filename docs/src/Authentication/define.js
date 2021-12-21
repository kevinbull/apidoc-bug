/**
 * @apiDefine RequiredAuthFields
 *
 * @apiParam (Required Fields) {String} username The unique username.
 * @apiParam (Required Fields) {String} password The password associated with the username.
 */

/**
 * @apiDefine AuthenticateUserPost
 *
 * @apiParamExample {json} Request Example:
 *     HTTP/1.1 200 OK
 *     {
 *       "auth": {
 *         "password": "ffdas",
 *         "username": "jshort"
 *       }
 *     }
 */

/**
 * @apiDefine AuthenticateResponse
 *
 * @apiSuccessExample {json} Success Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "access_token": {
 *         "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtZXRhX3VuaXZlcnNhbGlkIjoiMEMzNjBGRThCRDgwN0Y3MjBFN0YyQ0FCODZGMTRBRDIiLCJ1c2VyaWQiOiJqc2hvcnQiLCJpYXQiOjE2MDQ1OTUzNzMsImV4cCI6MTYwNzE4NzM3M30.e5wIuLeUa-yipO-KdMYEnG0YqRIQWzMr_MYuRG7RiOI",
 *         "new_user": true
 *       }
 *     }
 */
