#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import getEkadashiSchedule from '../src/ekadashi.js';

const calendarsDir = 'calendars';
const rootDir = path.resolve();
const year = new Date().getFullYear();
const sourcePath = path.resolve(rootDir, calendarsDir, `ekadashi${year}.txt`);
const destinationPath = path.resolve(rootDir, 'result.txt');

const data = fs.readFileSync(sourcePath, 'utf8');
const content = getEkadashiSchedule(data);
fs.writeFileSync(destinationPath, content);
console.log('Result in file >> result.txt');
