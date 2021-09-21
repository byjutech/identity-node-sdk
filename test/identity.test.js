import { identity } from '../src/index'
import faker from 'faker'

// const idOpts = {
//   serviceBaseUrl: 'http://localhost:9020',
//   oauth2: {
//     client: {
//       id: 'authapp-client',
//       secret: 'some-secret'
//     },
//     auth: {
//       tokenHost: 'https://localhost:9000',
//       tokenPath: '/oauth2/token',
//       revokePath: '/oauth2/revoke',
//       authorizePath: '/oauth2/auth'
//     },
//     http: {
//       rejectUnauthorized: false
//     }
//   },
//   scope: 'openid offline identities.find identities.create'
//   // scope: 'openid offline clients.authorize identities.find identities.read identities.create accounts.create profiles.create accounts.patch premiumaccounts.read'
// }

const idOpts = {
        serviceBaseUrl: 'https://identity-staging.tllms.com',
        oauth2: {
          client: {
            id: 'a6e0e4b6-f160-46cd-a9aa-0d2c37b3fc21',
            secret: 'y1KM0ZsL~NxeGnnP_JJM3Mab21'
          },
          auth: {
            tokenHost: 'https://hydra-auth-staging.tllms.com',
            tokenPath: '/oauth2/token',
            revokePath: '/oauth2/revoke',
            authorizePath: '/oauth2/auth'
          },
          // http: { } // wreck options
        },
        scope: 'openid offline identities.find identities.read identities.create accounts.create accounts.patch premiumaccounts.read'
      }

const phone = faker.phone.phoneNumberFormat()

describe('identities', () => {
  // test('create new', async () => {
  //   const service = identity(idOpts)
  //   const request = {
  //     phone: phone,
  //     accounts: [
  //       {
  //         first_name: faker.name.firstName(),
  //         last_name: faker.name.firstName()
  //       }
  //     ]
  //   }

  //   const createRes = await service.create(request)

  //   expect(createRes.phone).toBe(request.phone)
  //   expect(createRes.accounts).toHaveLength(request.accounts.length)
  // })

  test('find with phone', async () => {
    const service = identity(idOpts)
    const query = phone

    const searchRes = await service.find(query)

    expect(searchRes.phone).toBe(query)
  })

  // test('get by id', async () => {
  //   const service = identity({...idOpts, scope: 'identities.find identities.read'})
  //   const query = phone

  //   const searchRes = await service.find(query)

  //   const getRes = await service.get(searchRes.id)

  //   expect(getRes.phone).toBe(query)
  // })

  // test('update by id', async () => {
  //   const service = identity({...idOpts, scope: 'identities.find identities.update'})
  //   const query = phone

  //   const searchRes = await service.find(query)
  //   const newPhone = faker.phone.phoneNumberFormat()

  //   const updateRes = await service.update(searchRes.id, { phone: newPhone, verification: { otp: '', nonce: '', phone: newPhone } })

  //   expect(updateRes.phone).toBe(newPhone)
  // })

  // test('disallow create with wrong scopes', async () => {
  //   expect.assertions(1)

  //   const service = identity({...idOpts, scope: 'identities.read'})
  //   const request = {
  //     phone: faker.phone.phoneNumberFormat()
  //   }

  //   await expect(service.create(request)).rejects.toThrow()
  // })

  // test('allow create with correct scopes', async () => {
  //   const service = identity({...idOpts, scope: 'identities.create'})
  //   const request = {
  //     phone: faker.phone.phoneNumberFormat()
  //   }

  //   expect(service.create(request)).resolves.not.toThrow()
  // })
})

// describe('accounts', () => {
//   test('add to identity', async () => {
//     const service = identity({...idOpts, scope: 'identities.find accounts.create'})

//     const query = phone
//     const searchRes = await service.find(query)
//     let accountLength = searchRes.accounts.length

//     const request = {
//       first_name: faker.name.firstName(),
//       last_name: faker.name.firstName()
//     }

//     const createRes = await service.accounts.add(searchRes.id, request)

//     expect(createRes.accounts).toHaveLength(accountLength + 1)
//   })

//   // test('move from identity', async () => {
//   //   const service = identity({...idOpts, scope: 'identities.find accounts.create'})

//   //   const query = phone
//   //   const searchRes = await service.find(query)
//   //   let accountLength = searchRes.accounts.length

//   //   const request = {
//   //     first_name: faker.name.firstName(),
//   //     last_name: faker.name.firstName()
//   //   }

//   //   const createRes = await service.accounts.move(searchRes.id, request)

//   //   expect(createRes.accounts).toHaveLength(accountLength + 1)
//   // })
// })