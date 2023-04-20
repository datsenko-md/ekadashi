/* eslint no-restricted-syntax: "off" */

import fs from 'fs';
import _ from 'lodash';
import d from 'date-and-time';

const monthsEn = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const monthsUa = ['січня', 'лютого', 'березня', 'квітня', 'травня', 'червня', 'липня', 'серпня', 'вересня', 'жовтня', 'листопада', 'грудня'];

const ekadashiMap = {
  Putrada: 'Путрада',
  'Sat-tila': 'Шат-тіла',
  Bhaimi: 'Бхаймі',
  Vijaya: 'Віджая',
  Amalaki: 'Амалакі',
  Papamocani: 'Папамочані',
  Kamada: 'Камада',
  Varuthini: 'Варутхіні',
  Mohini: 'Мохіні',
  Apara: 'Апара',
  Pandava: 'Пандава',
  Yogini: 'Йогіні',
  Sayana: 'Шаяна',
  Kamika: 'Каміка',
  Padmini: 'Падміні',
  Parama: 'Парама',
  Pavitraropana: 'Павітропана',
  Annada: 'Аннада',
  Parsva: 'Паршва',
  Indira: 'Індіра',
  Pasankusa: 'Пашанкуша',
  Rama: 'Рама',
  Utthana: 'Уттхана',
  Utpanna: 'Утпанна',
  Moksada: 'Мокшада',
};

const getDays = (data) => {
  const lines = data.split('\n');
  const [kw1, kw2, kw3] = ['(suitable for fasting)', 'Fasting for', 'Break fast'];
  const filtered = lines.filter((l) => (l.includes(kw1)
    || l.includes(kw2)
    || l.includes(kw3)))
    .map((l) => l.trim());
  const groupped = _.chunk(filtered, 3);
  const ekadashi = groupped.map(([dateLine, nameLine, feastLine]) => {
    const [day, month, year] = dateLine.substring(0, 11).trim().split(' ');
    const monthId = monthsEn.indexOf(month);
    const fastDate = new Date(year, monthId, day);
    const feastDate = d.addDays(fastDate, 1);
    const [, , nameEn] = nameLine.split(' ');
    const name = ekadashiMap[nameEn];
    const feastStart = feastLine.substring(11, 16);
    const index = feastLine.indexOf(' - ');
    const feastFinish = feastLine.substring(index + 3, index + 8);
    return {
      monthId,
      fastDate,
      feastDate,
      name,
      feastStart,
      feastFinish,
    };
  });

  return ekadashi;
};

const getMessages = (ekadashiList) => ekadashiList.map((e) => 'Харе Крішна, дорогі віддані 🙏\n\n'
  + `Завтра, ${e.fastDate.getDate()} ${monthsUa[e.fastDate.getMonth()]}, `
  + `піст за **${e.name}** екадаші __(піст на зерно та боби)__.\n\n`
  + `Вихід з посту ${e.feastDate.getDate()} ${monthsUa[e.feastDate.getMonth()]} `
  + `з **${e.feastStart}** до **${e.feastFinish}** за київським часом\n\n`
  + '#екадаші');

const data = fs.readFileSync('/home/max/p/ekadashi/calendars/ekadashi2023.txt', 'utf8');
const ekadashi = getDays(data);
const messages = getMessages(ekadashi);
const content = messages.join('\n\n\n\n');
fs.writeFileSync('/home/max/p/ekadashi/result.txt', content);
