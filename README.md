## identity-node-sdk <!-- omit in toc -->
Node.js client library for using Identity service.

- [Getting started](#getting-started)
  - [Installation](#installation)
- [Examples](#examples)
  - [Find identity](#find-identity)
  - [Get identity](#get-identity)
  - [Create identity](#create-identity)
  - [Add account to identity](#add-account-to-identity)

## Getting started

### Installation
This library is **not** distributed on `npm`. In order to add it as a dependency, run the following command:

```sh
$ npm install git+ssh://git@github.com/byjutech/identity-node-sdk.git
```

## Examples

```js
import { identity } from 'identity-node-sdk'

const idOpts = {
  serviceBaseUrl: 'https://identity-staging.tllms.com',
  oauth2: {
    client: {
      id: 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx',
      secret: 'xxx-xxx-xxx'
    },
    auth: {
      tokenHost: 'https://hydra-auth-staging.tllms.com',
      tokenPath: '/oauth2/token',
      revokePath: '/oauth2/revoke',
      authorizePath: '/oauth2/auth'
    },
    // http: { } // wreck options
  },
  scope: 'openid offline identities.read identities.create accounts.create'
}
```

### Find identity

```js
const service = identity(idOpts)
const query = "+xx-xxxxxxxxxx"

const result = await service.find(query)
```

### Get identity

```js
const service = identity(idOpts)
const identityId = "xxxx-xxxxxxxxxx-xxxxxxx-xxxx"

const result = await service.get(query)
```

### Create identity

```js
const service = identity(idOpts)
const request = {
  phone: "+xx-xxxxxxxxxx",
  accounts: [ // Optional
    {
      first_name: "Bruce",
      last_name: "Wayne"
    }
  ]
}

const createRes = await service.create(request)
```

### Add account to identity

```js
const service = identity(idOpts)
const request = {
  first_name: "Jason",
  last_name: "Todd"
}

const createRes = await service.create(request)
```
