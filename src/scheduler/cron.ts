import { setGlobalEnvironment } from '../global'
import Environment from '../environments/environment'
import * as cron from 'node-cron'
import Explorer from '../models/explorer'
import { get as fetch } from '../providers/fetch'

const env: Environment = new Environment()
setGlobalEnvironment(env)

const url = global.environment.microServiceUrl

// run cron every 5 minutes
const job = cron.schedule('*/5 * * * *', async () => {
  console.log('Running a task every 5 minutes')
  const item = await Explorer.findOne({ description: null })
  if (item) {
    const newUrl: string = `${url}:5002`
    const result = await fetch(
      `${newUrl}/api/text?name=${item.name}&city=${item.city}&country=${item.country}&lon=${item.longitude}&lat=${item.latitude}&adventurePointImportance=${item.importance}`,
      {},
    )
    await Explorer.findByIdAndUpdate(item._id, { description: result })
  }
})

job.start()

//cron job code not executing
