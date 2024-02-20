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
