# it-note

IT-Note - An Electron application with Vue and TypeScript
v1.0
Проверка ошибок vue(в роутере, и дочерних компонентах app) и вывод уведомления пользователям
Вывод списка заметок, поиск по названию с пагинацией(изменения количества заметок на странице)
Создание/Редактирование - динамическое создание перемещение и удаление вариантов редактора кода и текстового поля, а также возможность изменения языка и шаблона codemirror элементов
Удаление Заметок из Редактирования и удаленик заметок из Списка заметок
**Работа с базой NeDB** -
-   addNote: добавление заметки
-   updateNoteById:  Обновление заметки по ключу
-   deleteNoteById:  Удаление заметки по ключу
-   getNoteById: Получение конкретной заметки по ключу
-   getAllNotes: Получение всех заметок

## Recommended IDE Setup

- [VSCode](https://code.visualstudio.com/) + [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) + [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin)

## Project Setup

### Install

```bash
$ npm install
```

### Development

```bash
$ npm run dev
```

### Build

```bash
# For windows
$ npm run build:win

# For macOS
$ npm run build:mac

# For Linux
$ npm run build:linux
```
