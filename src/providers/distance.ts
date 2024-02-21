import axios from 'axios'

export const getDistance = async (
  origin: number[],
  destination: number[],
  accessToken: string,
): Promise<void> => {
  try {
    const response = await axios.get(
      `https://api.mapbox.com/directions/v5/mapbox/driving/${origin[0]},${origin[1]};${destination[0]},${destination[1]}`,
      {
        params: {
          access_token: accessToken,
        },
      },
    )

    const distanceInMeters: number = response?.data?.routes[0].distance // Distance in meters
    const distanceInKilometers: number = distanceInMeters / 1000 // Convert to kilometers
    distanceInKilometers
  } catch (error) {
    console.error('Error fetching distance:', error)
    null
  }
}

export const getDistanceAndTime = async (
  origin: number[],
  destination: number[],
  accessToken: string,
): Promise<{ distance: number; duration: number }> => {
  // eslint-disable-next-line no-useless-catch
  try {
    const coordinates: [number, number][] = [
      [origin[0], origin[1]], // Origin coordinates [longitude, latitude]
      [destination[0], destination[1]], // Destination coordinates [longitude, latitude]
    ]

    // const apiUrl = `https://api.mapbox.com/directions/v5/mapbox/driving/${coordinates[0][0]},${coordinates[0][1]};${coordinates[1][0]},${coordinates[1][1]}?geometries=geojson&access_token=${accessToken}`

    const response = await axios.get(
      `https://api.mapbox.com/directions/v5/mapbox/driving/${coordinates[0][0]},${coordinates[0][1]};${coordinates[1][0]},${coordinates[1][1]}?geometries=geojson&`,
      {
        params: {
          access_token: accessToken,
        },
      },
    )
    // const response = await axios.get(apiUrl)
    const route = response.data.routes[0]
    const distanceInMeters = route.distance // Distance in meters
    const distanceInKilometers: number = distanceInMeters / 1000
    const duration = route.duration / 60 // Duration in minutes

    return { distance: distanceInKilometers, duration }
  } catch (error) {
    console.error(error)
    return { distance: null, duration: null }
  }
}
