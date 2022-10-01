import { EmailValidatorAdapter } from './email-validator'
import validator from 'validator'

jest.mock('validator', () => ({
  isEmail (): boolean {
    return true
  }
}))

describe('EmailValidator Adapter', () => {
  test('Retorna falso se o EmailValidator retornar falso', () => {
    const sut = new EmailValidatorAdapter()
    jest.spyOn(validator, 'isEmail').mockReturnValueOnce(false)
    const isValid = sut.isValid('invalid_email@mail.com')
    expect(isValid).toBe(false)
  })

  test('Retorna true se o EmailValidator retornar true', () => {
    const sut = new EmailValidatorAdapter()
    const isValid = sut.isValid('email@mail.com')
    expect(isValid).toBe(true)
  })
})
