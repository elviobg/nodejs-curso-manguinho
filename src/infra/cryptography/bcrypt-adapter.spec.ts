import bcrypt from 'bcrypt'
import { BcryptAdapter } from './bcrypt-adapter'

jest.mock('bcrypt', () => ({
  async hash (): Promise<string> {
    return await new Promise(resolve => resolve('hash'))
  }
}))

const salt = 12
const makeSut = (): BcryptAdapter => {
  return new BcryptAdapter(salt)
}

describe('Bcrypt Adapter', () => {
  test('Deve chamar o adapter com os valores corretos', async () => {
    const sut = makeSut()
    const hashSpy = jest.spyOn(bcrypt, 'hash')
    await sut.encrypt('value')
    expect(hashSpy).toHaveBeenCalledWith('value', salt)
  })

  test('Deve retornar o hash se de sucesso', async () => {
    const sut = makeSut()
    const hash = await sut.encrypt('value')
    expect(hash).toBe('hash')
  })
})
