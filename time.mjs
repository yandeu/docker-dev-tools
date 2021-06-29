import { writeFileSync } from "fs"

const time = new Date().toUTCString()

writeFileSync('./time.txt', time, { encoding: 'utf-8' })