const {
  scullyConfig,
  registerPlugin
} = require('@scullyio/scully');
const JSON5 = require('json5');

const {
  readFileSync,
  unlinkSync
} = require('fs');
const {
  join
} = require('path');

function cleanupJsPlugin() {
  const scullyDisableAngularStatsJsonPath = join(scullyConfig.distFolder, 'scully-plugin-disable-angular-stats.json');
  const tsConfigPath = join(scullyConfig.projectRoot, 'tsconfig.app.json');
  let tsConfig;
  try {
    tsConfig = JSON5.parse(readFileSync(tsConfigPath, {encoding: 'utf8'}).toString());
  } catch (e) {
    console.log(`Error reading tsConfig at path ${tsConfigPath}`);
    console.error(e);
    throw new Error(e);
  }
  let isEs5Config = false;
  const target = tsConfig.compilerOptions.target || 'es2015';
  if (target === 'es5') {
    isEs5Config = true;
  }
  try {
    let assetsList = JSON5.parse(readFileSync(scullyDisableAngularStatsJsonPath, {encoding: 'utf8'}).toString());
    assetsList = assetsList
      .map(entry => entry['name'])
      .filter(entry => entry.includes('.js'));
    if (!isEs5Config) {
      assetsList = [...assetsList, ...assetsList.map(asset => {
        return asset.includes('-es5') ?
          asset.replace('-es5', '-es2015') :
          asset.replace('-es2015', '-es5');
      })];
    }
    assetsList = [
      ...assetsList,
      'scully-plugin-disable-angular-stats.json',
      'stats.json',
      'stats-es2015.json'
    ];
    assetsList.forEach(entry => {
      const filePath = join(scullyConfig.outDir, entry);
      try {
        console.log('unlinking ', filePath);
        unlinkSync(filePath);
      } catch (e) {
        // console.log(`Could not unlink ${filePath}`)
      }
    });
  } catch (e) {
    console.error(e);
  }
}

// DO NOT FORGET TO REGISTER THE PLUGIN
registerPlugin('allDone', 'cleanupJs', cleanupJsPlugin);
