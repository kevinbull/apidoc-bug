## Overview
The project uses an API-first approach. This means anything that is possible through the UI is
also available through this API layer. There is a RESTful API to create, read, update and delete records.
Aside from typical CRUD activity, there are APIs to fetch listings of records and to take action
on those records.

Every API is protected by the same authentication used by the UI. A user’s 
credentials are required to use the API.

The following headers are required in every request:

Header |  Value
--- | ---
Authorization | The auth token provided by posting the user’s credentials to the [/api/authenticate](#api-Authentication-AuthenticateUser) endpoint
Content-Type | application/json

### Notes
* JSON fields are case-sensitive.
