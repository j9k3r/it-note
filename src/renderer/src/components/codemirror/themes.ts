import { oneDark } from '@codemirror/theme-one-dark'
import { dracula } from 'thememirror'
import { amy } from 'thememirror'
import { ayuLight } from 'thememirror'

export enum themesList {
  oneDark,
  dracula,
  amy,
  ayuLight,
}

export const themes = [
  {
    extension: oneDark,
    name: themesList[themesList.oneDark]
  },
  {
    extension: dracula,
    name: themesList[themesList.dracula]
  },
  {
    extension: amy,
    name: themesList[themesList.amy]
  },
  {
    extension: ayuLight,
    name: themesList[themesList.ayuLight]
  },
]

// export default themes
