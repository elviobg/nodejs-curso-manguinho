import { DbAddAccount } from './db-add-account'

describe('DbAddAccount UseCase', () => {
  test('Deve chamar a interface responsavel pela encriptação com password correto', async () => {
    class EncrypterStub {
      async encrypt (password: string): Promise<string> {
        return await new Promise(resolve => resolve('hashed_password'))
      }
    }

    const encrypterStub = new EncrypterStub()
    const sut = new DbAddAccount(encrypterStub)
    const encryptySpy = jest.spyOn(encrypterStub, 'encrypt')
    const accountData = {
      name: 'valid_name',
      email: 'valid_email',
      password: 'valid_password'
    }

    await sut.add(accountData)
    expect(encryptySpy).toHaveBeenCalledWith('valid_password')
  })
})
