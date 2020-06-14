import {writeFileSync} from 'fs';
import {cwd} from 'process';

export async function readFile<T>(file: string): Promise<T> {
    return await require(`${cwd()}/${file}`);
}

export function writePackageJson(data: unknown, outDir: string = 'out'): void {
    writeFileSync(`${cwd()}/${outDir}/package.json`, JSON.stringify(data, null, 2));
}