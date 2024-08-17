import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default async (ctx:any, target:any) => {
  const headerFile = await Bun.file(path.join(__dirname, 'header.css')).text();

  const header = headerFile.replace('[YEAR]', new Date().getFullYear()+'');

  const mainCssContent = [header];

  for (const [variant, icons] of Object.entries(ctx.icons)) {
    const variantCssContent = [header];

    const cssTarget = (icon:any, suffixed?:any) => {
      const iconName =
        suffixed && variant !== ctx.global.defaultVariant
          ? icon.nameVariant
          : icon.name;

      return `.iconoir-${iconName}::before`;
    };

    for (const icon of icons as any) {
      const fileContent = await Bun.file(icon.path).text();

      const transformedContent = fileContent
        .replace(/\n/g, '')
        .replace(/(width|height)="[0-9]+px"/g, '')
        .replace(/[ ]+/g, ' ');

      const cssContent = `{mask-image:url('data:image/svg+xml;charset=utf-8,${transformedContent}');-webkit-mask-image:url('data:image/svg+xml;charset=utf-8,${transformedContent}');}`;

      mainCssContent.push(`${cssTarget(icon, true)}${cssContent}`);

      variantCssContent.push(`${cssTarget(icon)}${cssContent}`);
    }

    await Bun.write(
      path.join(target.path, `emoticon-${variant}.css`),
      variantCssContent.join(''),
    );
  }

  await Bun.write(path.join(target.path, 'emoticon.css'), mainCssContent.join(""));
};
