import { identity } from '../index'
import faker from 'faker'

const idOpts = {
  serviceBaseUrl: 'http://localhost:9020',
  oauth2: {
    client: {
      id: '66cffe24-adf8-4fd5-b852-4a1b1885fac7',
      secret: 'D0rM-D_Rb94PD.bMpHVJq-KuSZ'
    },
    auth: {
      tokenHost: 'https://localhost:9000',
      tokenPath: '/oauth2/token',
      revokePath: '/oauth2/revoke',
      authorizePath: '/oauth2/auth'
    },
    http: {
      rejectUnauthorized: false
    }
  },
  scope: 'openid offline identities.read identities.create'
  // scope: 'openid offline clients.authorize identities.read identities.create accounts.create profiles.create'
}

describe('identities', () => {
  test('find with phone', async () => {
    const service = identity(idOpts)
    const query = "xxxxxxxxxx"

    const searchRes = await service.find(query)

    expect(searchRes.phone).toBe(query)
  })

  test('create new', async () => {
    const service = identity(idOpts)
    const request = {
      phone: faker.phone.phoneNumberFormat(),
      accounts: [
        {
          first_name: faker.name.firstName(),
          last_name: faker.name.firstName()
        }
      ]
    }

    const createRes = await service.create(request)

    expect(createRes.phone).toBe(request.phone)
    expect(createRes.accounts).toHaveLength(request.accounts.length)
  })

  test('disallow create with wrong scopes', async () => {
    expect.assertions(1)

    const service = identity({...idOpts, scope: 'identities.read'})
    const request = {
      phone: faker.phone.phoneNumberFormat()
    }

    await expect(service.create(request)).rejects.toThrow()
  })

  test('allow create with correct scopes', async () => {
    const service = identity({...idOpts, scope: 'identities.create'})
    const request = {
      phone: faker.phone.phoneNumberFormat()
    }

    expect(service.create(request)).resolves.not.toThrow()
  })
})