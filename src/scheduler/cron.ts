import { setGlobalEnvironment } from '../global'
import Environment from '../environments/environment'
const env: Environment = new Environment()
setGlobalEnvironment(env)
import cron from 'node-cron'
import Explorer from '../models/explorer'
import { get as fetch } from '../providers/fetch'
// import { TextService } from 'interfaces/explorer'
const url = global.environment.microServiceUrl
// const textService = async (item: TextService) => {
//   return result
// }

//run cron every 5 min
cron.schedule('* * * * *', async () => {
  // cron.schedule('*/5 * * * *', async () => {
  console.log('running a task every  minutes')
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
