const { src, dest } = require('gulp');
const fileinclude = require('gulp-file-include');
const asciidoctor = require('@asciidoctor/core')();
const rename = require('gulp-rename');

function build() {
	convertAdoc();
	return includeHtml();
}

// Экспорт задачи
exports.default = build;

// Задача для вставки содержимого одного HTML-файла в другой
function includeHtml() {
  return src('template.html')
    .pipe(fileinclude({
      prefix: '@@', // Префикс для включения
      basepath: '@file' // Базовый путь для включений
    }))
	.pipe(rename('index.html'))
    .pipe(dest('.'));
}

// Экспорт задачи
exports.includeHtml = includeHtml;

function convertAdoc() {
  return asciidoctor.convertFile('document.adoc', {
    to_file: 'gen-tz1.html', 
	standalone: false,
	safe: 'safe'
  });
}

// Экспорт задачи
exports.convertAdoc = convertAdoc;
