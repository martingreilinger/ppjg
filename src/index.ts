import {readFile, writePackageJson,} from './helper'
import {PackageJson} from "./package-json";

(async () => {
    const config = await readFile<{persist: Array<string>, alter: PackageJson}>('ppj.conf.js');
    const cpj = await readFile<PackageJson>('package.json');

    const persistedValues = Object.keys(cpj)
        .filter(key => config.persist.indexOf(key) > -1)
        .reduce((previousValue, currentValue) => Object.assign(previousValue, {[currentValue]: cpj[currentValue]}), {});
    return writePackageJson(Object.assign(persistedValues, config.alter));
})().then(() => console.log('completed'))
