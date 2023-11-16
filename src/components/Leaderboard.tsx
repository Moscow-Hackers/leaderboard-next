import Image from 'next/image'
import { createAvatar } from '@dicebear/core'
import { initials } from '@dicebear/collection'
import { PwnCollegeHacker, PwnCollegeHackerWithImage } from '@/types'

import { getHackers } from '@/lib/getHackers'
import { getPwnCollegeHackers } from '@/lib/getPwnCollegeHackers'
import { getBlurredImage } from '@/lib/getBlurredImage'

import {
  TableHead,
  TableRow,
  TableHeader,
  TableCell,
  TableBody,
  Table,
} from '@/components/ui/table'

const getAvatar = (hackerName: string) =>
  createAvatar(initials, {
    seed: hackerName,
  }).toDataUriSync()

const getBlurredImages = async (
  hackers: PwnCollegeHacker[]
): Promise<PwnCollegeHackerWithImage[]> =>
  await Promise.all(
    hackers.map(
      async ({ avatar, ...hacker }): Promise<PwnCollegeHackerWithImage> => {
        if (avatar) {
          const image = await getBlurredImage(avatar)
          return { avatar, image, ...hacker }
        } else {
          return { avatar, ...hacker }
        }
      }
    )
  )

async function getData(): Promise<PwnCollegeHackerWithImage[]> {
  const hackers = await getHackers()
  const pwnCollegeHackers = await getPwnCollegeHackers(hackers)
  const pwnCollegeHackersWithImage = await getBlurredImages(pwnCollegeHackers)

  return pwnCollegeHackersWithImage.sort((a, b) => b.solves - a.solves)
}

export async function Leaderboard() {
  const hackers = await getData()

  return (
    <div className="w-full transition translate-y-0 hover:translate-y-1 shadow-lg overflow-hidden border-b border-zinc-200 sm:rounded-lg bg-white dark:border-gray-700 dark:bg-gray-900">
      <Table className="text-lg w-full">
        <TableHeader>
          <TableRow>
            <TableHead className="text-black dark:text-gray-200">
              Rank
            </TableHead>
            <TableHead className="text-black dark:text-gray-200"> </TableHead>
            <TableHead className="text-black dark:text-gray-200">
              Name
            </TableHead>
            <TableHead className="text-black dark:text-gray-200">
              Solves
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {hackers.map((hacker, idx) => (
            <TableRow key={hacker.pwnCollegeId}>
              <TableCell className="text-black dark:text-gray-300">
                #{idx + 1}
              </TableCell>
              <TableCell>
                {hacker.avatar ? (
                  <Image
                    className="rounded-full"
                    alt={hacker.name}
                    width={40}
                    height={40}
                    src={hacker.avatar}
                    placeholder="blur"
                    blurDataURL={hacker.image}
                  />
                ) : (
                  <Image
                    className="rounded-full"
                    alt={hacker.name}
                    width={40}
                    height={40}
                    src={getAvatar(hacker.name)}
                  />
                )}
              </TableCell>
              <TableCell className="text-black dark:text-gray-300">
                {hacker.name}
              </TableCell>
              <TableCell className="text-black dark:text-gray-300">
                {hacker.solves}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
