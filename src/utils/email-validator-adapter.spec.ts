import { EmailValidatorAdapter } from './email-validator-adapter'
import validator from 'validator'

jest.mock('validator', () => ({
  isEmail (): boolean {
    return true
  }
}))

const makeSut = (): EmailValidatorAdapter => {
  return new EmailValidatorAdapter()
}

describe('EmailValidator Adapter', () => {
  test('Retorna falso se o EmailValidator retornar falso', () => {
    const sut = makeSut()
    jest.spyOn(validator, 'isEmail').mockReturnValueOnce(false)
    const isValid = sut.isValid('invalid_email@mail.com')
    expect(isValid).toBe(false)
  })

  test('Retorna true se o EmailValidator retornar true', () => {
    const sut = makeSut()
    const isValid = sut.isValid('email@mail.com')
    expect(isValid).toBe(true)
  })

  test('Deve chamar o validator com o email correto', () => {
    const sut = makeSut()
    const isEmailSpy = jest.spyOn(validator, 'isEmail')
    sut.isValid('email@mail.com')
    expect(isEmailSpy).toHaveBeenCalledWith('email@mail.com')
  })
})
