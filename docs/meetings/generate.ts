import template from 'es6-template-string';
import fs from 'fs';

const args = process.argv.slice(2);

if (args.length < 2) {
  throw Error('Template and directory not specified.');
}

const dir = args[0] || __dirname;
const templateFile = args[1] || `${dir}/meetings.t.md`;
const templateText = fs.readFileSync(templateFile, 'utf-8');

const files = fs.readdirSync(__dirname);
files
  .filter((file) => file.endsWith('.json'))
  .forEach((file) => {
    const fileData = JSON.parse(fs.readFileSync(`${dir}/${file}`, 'utf-8'));
    const finalText = template(templateText, fileData).replace(
      RegExp('newlineChar'.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'),
      '\n'
    );
    const finalFile = file.split('.')[0];
    fs.writeFileSync(`${dir}/${finalFile}.md`, finalText);
  });
