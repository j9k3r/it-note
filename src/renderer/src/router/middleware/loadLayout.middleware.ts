import { LayoutToFileMap } from '../../layouts/layouts.types'

export async function loadLayoutMiddleware(route) {
  const { layout } = route.meta,
    normalizedLayoutName = layout || 'default',
    fileName = LayoutToFileMap[normalizedLayoutName],
    fileNameWithoutExtension = fileName.split('.vue')[0]

  const component = await import(
    `../../layouts/${fileNameWithoutExtension}.vue`
    );

  route.meta.layoutComponent = component.default
}
