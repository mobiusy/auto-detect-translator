import 'dotenv/config'
import fs from 'fs';
import path from 'path';
import readline from 'readline';
import tranlationCache from './translations.json';
import { translate } from './lib/translator';

const tCache = tranlationCache as Record<string, string>;

// function toTranslationMap() {
//   // tranlationCache to map
//   const map = new Map<string, string>();
//   for (const [k, v] of Object.entries(tranlationCache)) {
//     map.set(k, v);
//   }

//   return map;
// }

function writeTranslationToFile() {
  // write translationMap to file
  // conver from map to object
  tCache["英文"] = "English";
  fs.writeFileSync('./src/translations.json', JSON.stringify(tCache, null, 2));
  console.log('==============================');
  console.log(tCache)
}

// const translationMap = toTranslationMap();
// console.log('==============================');
// console.log(translationMap);



const directory = process.env.FOLDER || '';
const chinesePattern = /[\u4e00-\u9fa5]+/g;

let replaceFileCount = 0;
const replaceLimit = 1;
const walkDirectory = async (dir: string) => {
  const files = await fs.promises.readdir(dir);

  for (const file of files) {
    if (replaceFileCount >= replaceLimit) {
      break;
    }
    const filePath = path.join(dir, file);
    const isDir = await fs.promises.stat(filePath).then((stat) => stat.isDirectory());

    if (isDir && file !== 'node_modules') {
      await walkDirectory(filePath);
    } else if (!isDir) {
      await replaceChineseInFile(filePath);
    }
  }
};

const replaceChineseInFile = async (filePath: string) => {
  const writeStream = fs.createWriteStream(filePath + '.tmp');
  const rl = readline.createInterface({
    input: fs.createReadStream(filePath),
  });

  let contentModified = false;

  for await (let line of rl) {
    const matches = line.match(chinesePattern);
    if (matches) {
      for (const match of matches) {
        console.log(`匹配到的中文内容: ${match}`);
        if (tCache[match]) {
          line = line.replace(match, tCache[match] as string);
        } else {
          // call translation service to get result
          const result = await translate(match);
          tCache[match] = result;
          line = line.replace(match, result);
        }
        line = line.replace(match, 'Chinese');
        contentModified = true;
        console.log(`替换后的内容: ${line}`);
      }
    }

    writeStream.write(line + '\n');
  }
  rl.close();
  writeStream.close();

  if (contentModified) {
    replaceFileCount++;
    await fs.promises.rename(filePath + '.tmp', filePath);
    console.log(`文件 ${filePath}.tmp 已修改`);
  } else {
    await fs.promises.unlink(filePath + '.tmp');
  }
};

export function run() {
  walkDirectory(directory).then(() =>console.log('遍历完成')).then(() => writeTranslationToFile());

}


run();

