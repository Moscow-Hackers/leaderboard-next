import type { PwnCollegeHacker, MoscowHacker } from '@/types'

export const getPwnCollegeHackers = async (
  hackers: MoscowHacker[]
): Promise<PwnCollegeHacker[]> =>
  await Promise.all(
    hackers.map(
      ({ pwnCollegeId, ...hacker }: MoscowHacker) =>
        new Promise<PwnCollegeHacker>(async (resolve) => {
          const response = await fetch(
            `https://pwn.college/api/v1/users/${pwnCollegeId}/solves`
          )
          const {
            meta: { count: solves },
          } = await response.json()
          resolve({ solves, pwnCollegeId, ...hacker })
        })
    )
  )
