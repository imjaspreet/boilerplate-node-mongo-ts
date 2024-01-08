export interface IExplorer {
  id: string
  latitude: number
  longitude: number
  name: string
  location: object
  city: string
  country: string
  importance: number
  additionalSources: Array<object>
  categories: Array<string>
  properties: Array<string>
  foreignSources: Array<object>
}

export interface IExplorerModel {
  latitude: number
  longitude: number
  name: string
  location: object
  city: string
  country: string
  importance: number
  additionalSources: Array<object>
  categories: Array<string>
  properties: Array<string>
  foreignSources: Array<object>
}
