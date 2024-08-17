import vue from '@vitejs/plugin-vue';
import { fromHtml } from 'hast-util-from-html';
import { toHtml } from 'hast-util-to-html';
import fs from 'node:fs/promises';
import path from 'node:path';
import { build } from 'vite';
import dts from 'vite-plugin-dts';
import { generateExport } from '../../lib/import-export.js';
import iconTemplate from './template.ts';


export default async (ctx:any, target:any) => {
  const promises = [];

  const outDir = path.join(target.path, 'src');

  const mainIndexContent = [
    generateExport(`default as IconoirProvider`, `./IconoirProvider.vue`),
  ];

  for (const [variant, icons] of Object.entries(ctx.icons)) {
    const variantOutDir = path.join(outDir, variant);
    await fs.mkdir(variantOutDir, { recursive: true });

    const variantIndexContent = [
      generateExport(`default as IconoirProvider`, `../IconoirProvider.vue`),
    ];

    const generateIconFile = async (src:string, vueFileName:string) => {
      let iconContent = await Bun.file(src).text();

      if (variant === 'HighContrast') {
        iconContent = iconContent.replace(/fill\s*=\s*['"][^'"]*['"]/g, '');
      }

      const iconAst = fromHtml(iconContent, { fragment: true }) as any;
      // Bind iconProps of the provider to the svg root
      if (variant === 'HighContrast') {
        iconAst.children[0].properties['fill'] = '#21212';
      }
      iconAst.children[0].properties['v-bind'] = 'context';
      const transformedIcon = toHtml(iconAst);
      const componentContent = iconTemplate(transformedIcon);

      const vuePath = path.join(variantOutDir, vueFileName);

      return await Bun.write(vuePath, componentContent);
    };

    for (const icon of icons as any) {
      const vueFileName = `${icon.pascalName}.vue`;

      promises.push(generateIconFile(icon.path, vueFileName));

      const mainIndexComponentName =
        variant === ctx.global.defaultVariant
          ? icon.pascalName
          : icon.pascalNameVariant;

      mainIndexContent.push(
        generateExport(
          `default as ${mainIndexComponentName}`,
          `./${variant}/${vueFileName}`
        ),
      );

      variantIndexContent.push(
        generateExport(
          `default as ${mainIndexComponentName}`,
          `./${vueFileName}`
        ),
      );
    }
    promises.push(
      Bun.write(path.join(variantOutDir, 'index.ts'), variantIndexContent.join('')),
    );
  }
  promises.push(Bun.write(path.join(outDir, 'index.ts'), mainIndexContent.join('\n')));
  return await Promise.all(promises).then(()=>{
     return build({
      root: target.path,
      logLevel: 'silent',
      build: {
      //   rollupOptions: {
      //     external: [ 'vue'],
      //     output:[
      //       {
      //         format: 'cjs',
      //         dir: path.join(target.path, 'dist'),
      //         exports: 'named',
      //         preserveModules: true,
      //         entryFileNames: '[name].js',
      //       },
      //       {
      //         format: 'es',
      //         dir: path.join(target.path,'dist', 'esm'),
      //         exports: 'named',
      //         preserveModules: true,
      //         entryFileNames: '[name].mjs',
      //       },
      //     ]
      //   },
        outDir: 'dist',
        lib: {
          entry: path.join('src', 'index.ts'),
          fileName: (format, name) =>
              format === 'cjs' ? `${name}.js` : `esm/${name}.mjs`,
          formats: ['cjs', 'es'],
        },
        rollupOptions: {
          external: [ 'vue'],
        },
      },
      plugins: [
        vue(),
        dts(),
      ],
    });
  });


};
