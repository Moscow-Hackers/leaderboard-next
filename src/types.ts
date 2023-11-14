// export type MoscowHacker = {
//   name: string
//   pwnCollegeId: number
//   avatar?: string
// }

// export type PwnCollegeHacker = MoscowHacker & {
//   solves: number
// }

// export type PwnCollegeHackerWithImage = PwnCollegeHacker & {
//   image?: string
// }

export interface MoscowHacker {
  name: string
  pwnCollegeId: number
  avatar?: string
}

export interface PwnCollegeHacker extends MoscowHacker {
  solves: number
}

export interface PwnCollegeHackerWithImage extends PwnCollegeHacker {
  image?: string
}
