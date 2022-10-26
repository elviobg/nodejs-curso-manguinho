import { MongoClient, Collection } from 'mongodb'

export const MongoHelper = {
  client: MongoClient,

  async connect (uri: string): Promise<void> {
    this.client = await MongoClient.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
  },

  async disconnect (): Promise<void> {
    this.client.close()
  },

  getCollection (name: string): Collection {
    return this.client.db().collection(name)
  },

  map (model: any): any {
    const { _id, ...modelWhitoutId } = model
    return Object.assign({}, modelWhitoutId, { id: _id })
  }
}
