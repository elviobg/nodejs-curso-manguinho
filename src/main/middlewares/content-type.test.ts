import request from 'supertest'
import app from '../config/app'

describe('Content type middleware', () => {
  test('Garante que o retorno padrão do content type será json', async () => {
    app.post('test_content_type', (req, res) => {
      res.send('')
    })
    await request(app)
      .post('/test_content_type')
      .expect('content-type', /json/)
  })
})
