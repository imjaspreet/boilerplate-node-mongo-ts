/* eslint-disable @typescript-eslint/no-explicit-any */
import * as Axios from 'axios'
/**
 *
 * @param {string} apiUrl
 * @param {*} headers
 * @returns
 */
export const get = async (apiUrl: string, headers: any) => {
  try {
    const response = await Axios.default.get(apiUrl, headers)
    if (response.status === 200) {
      return response.data
    } else {
      throw new Error(response.data?.error?.message || 'Request failed')
    }
  } catch (error) {
    throw error.message
  }
}

/**
 *
 * @param {string} apiUrl
 * @param {object} body
 * @param {*} headers
 */
export const post = async (apiUrl: string, body: object, headers: any) => {
  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers,
      body: JSON.stringify(body),
    })
    const data = await response.json()
    if (response.ok) {
      return data
    } else {
      throw new Error(data?.error?.message || 'Request failed')
    }
  } catch (error) {
    throw error.message
  }
}

/**
 *
 * @param {string} apiUrl
 * @param {object} body
 * @param {object} headers
 */
export const put = async (apiUrl: string, body: object, headers: any) => {
  try {
    const response = await fetch(apiUrl, {
      method: 'PUT',
      headers,
      body: JSON.stringify(body),
    })
    const data = await response.json()
    if (response.ok) {
      return data
    } else {
      throw new Error(data?.error?.message || 'Request failed')
    }
  } catch (error) {
    throw error.message
  }
}

/**
 *
 * @param {string} apiUrl
 * @param {*} headers
 * @returns
 */
export const remove = async (apiUrl: string, headers: any) => {
  try {
    const response = await fetch(apiUrl, { method: 'DELETE', headers })
    const data = await response.json()
    if (response.ok) {
      return data
    } else {
      throw new Error(data?.error?.message || 'Request failed')
    }
  } catch (error) {
    throw error.message
  }
}
