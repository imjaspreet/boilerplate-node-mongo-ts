import * as cron from 'node-cron'
import { setGlobalEnvironment } from '../global'
import Environment from '../environments/environment'
import Explorer from '../models/explorer'
import { get as fetch } from '../providers/fetch'
import * as Axios from 'axios'
const env: Environment = new Environment()
setGlobalEnvironment(env)

const url = global.environment.microServiceUrl

// run cron every 5 minutes
const job1 = cron.schedule('10 * * * *', async (): Promise<void> => {
  console.log('Running a task every one minute')
  try {
    const item = await Explorer.findOne({ description: null })

    if (item) {
      const newUrl: string = `${url}:5002`
      const result: string = await fetch(
        `${newUrl}/api/text?name=${item.name}&city=${item.city}&country=${item.country}&lon=${item.longitude}&lat=${item.latitude}&adventurePointImportance=${item.importance}`,
        {},
      )

      // await Explorer.findByIdAndUpdate(item._id, { description: result })
      item.description = result
      await item.save()
    }
  } catch (error) {
    console.log('Error:', error)
  }
})

const job2 = cron.schedule('* * * * *', async (): Promise<void> => {
  console.log('Running a task every one minute')
  try {
    const item = await Explorer.findOne({ shortDescription: null })

    if (item) {
      const newUrl: string = `${url}:5004`
      const result: { description: string } = await fetch(
        `${newUrl}/api/description?name=${item.name}&city=${item.city}&country=${item.country}`,
        {},
      )
      item.shortDescription = result ? result?.description : null
      await item.save()
    }
  } catch (error) {
    console.log('Error:', error)
  }
})

const job3 = cron.schedule('10 * * * *', async (): Promise<void> => {
  // console.log(' job3 Cron  Running a task every one minute')
  try {
    const item = await Explorer.findOne({
      description: { $ne: null },
      'audioFile.germany': null,
    })
    if (!item) return
    const data = JSON.stringify({ article: item.description })
    const newUrl: string = `${url}:5003`
    const config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: `${newUrl}/api/text`,
      headers: {
        'Content-Type': 'application/json',
      },
      data,
    }

    const response = await Axios.default.request(config)

    item.audioFile = { germany: response.data, english: null }
    await item.save()
  } catch (error) {
    console.log('Error:', error)
  }
})

export default function job() {
  job1.start()
  job2.start()
  job3.start()
}
