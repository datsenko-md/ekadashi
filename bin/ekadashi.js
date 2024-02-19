#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import axios from 'axios';

import getEkadashiSchedule from '../src/ekadashi.js';

const city = 'Dnepropetrovsk';
const country = 'Ukraine';
const year = new Date().getFullYear();
const url = `https://www.vaisnavacalendar.info/calendars/${year}/${city}%20[${country}].txt`;
const destinationPath = path.resolve(path.resolve(), 'result.txt');
const { data } = await axios.get(url, { responseType: 'text' });
const content = getEkadashiSchedule(data);
fs.writeFileSync(destinationPath, content);
console.log('Result in file >> result.txt');
