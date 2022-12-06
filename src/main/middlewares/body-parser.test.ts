import request from 'supertest'
import app from '../config/app'

describe('Body parser middleware', () => {
  test('Garante que o valor recebido no request vai ser parseado em json', async () => {
    app.post('test_body_parser', (req, res) => {
      res.send(req.body)
    })
    await request(app)
      .post('/test_body_parser')
      .send({ name: 'Rota teste' })
      .expect({ name: 'Rota teste' })
  })
})
