import { Request } from 'express'

interface SortOptions {
  [key: string]: number
}

interface ExtractPageOptions {
  sort?: SortOptions
  pageNo?: number
  limit?: number
  serverPaging?: boolean | string
}

interface PaginationOptions {
  sort: SortOptions
  pageNo: number
  limit: number
  skip: number
}

export const extractPage = (req: Request): PaginationOptions | null => {
  const {
    sort = { createdAt: -1 },
    pageNo = 1,
    limit = 10,
    serverPaging = true,
  }: ExtractPageOptions = req.query

  delete req.query.serverPaging
  delete req.query.pageNo
  delete req.query.limit

  if (!serverPaging || serverPaging === 'false') {
    return null
  }

  return {
    sort,
    pageNo,
    limit: limit,
    skip: limit * (pageNo - 1),
  }
}
