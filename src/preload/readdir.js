import fs from 'fs'

export default function readDir(dir) {
  return fs.readdirSync(dir)
}
