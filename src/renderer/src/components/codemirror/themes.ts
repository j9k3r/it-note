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

export const themes: { [key in themesList]: { extension: any, name: string } }  = {
  [themesList.oneDark]: {
    extension: oneDark,
    name: themesList[themesList.oneDark]
  },
  [themesList.dracula]: {
    extension: dracula,
    name: themesList[themesList.dracula]
  },
  [themesList.amy]: {
    extension: amy,
    name: themesList[themesList.amy]
  },
  [themesList.ayuLight]: {
    extension: ayuLight,
    name: themesList[themesList.ayuLight]
  },
}

// export default themes
