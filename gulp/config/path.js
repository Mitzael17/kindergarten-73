import * as nodePath from 'path';
const rootFolder = nodePath.basename(nodePath.resolve());


const buildFolder = `./dist`;
const srcFolder = `./src`;


export const path = {
	build: {
		js: `${buildFolder}/scripts/`,
		images: `${buildFolder}/img/`,
		html: `${buildFolder}/`,
		css: `${buildFolder}/styles/`,
        files: `${buildFolder}/files/`,
		fonts: `${buildFolder}/fonts/`,
		pug: `${buildFolder}/`,
    },
	src: {
		js: `${srcFolder}/scripts/*.js`,
		images: `${srcFolder}/img/**/*.{jpg,jpeg,png,gif,webp}`,
		svg: `${srcFolder}/img/**/*.svg`,
		html: `${srcFolder}/*.html`,
		scss: `${srcFolder}/styles/*.sass`,
        files: `${srcFolder}/files/**/*.*`,
		svgicons: `${srcFolder}/svgicons/*.svg`,
		pug: `${srcFolder}/*.pug`,
    },
	watch: {
		js: `${srcFolder}/scripts/**/*.js`,
		scss: `${srcFolder}/styles/**/*.sass`,
		html: `${srcFolder}/**/*.html`,
		images: `${srcFolder}/img/**/*.{jpg,jpeg,png,gif,webp,svg,ico}`,
		files: `${srcFolder}/files/**/*.*`,
		svgSprive: `${srcFolder}/svgicons/**/*.svg`,
		pug: `${srcFolder}/**/*.pug`,
	},
	clean: buildFolder,
	buildFolder: buildFolder,
	srcFolder: srcFolder,
	rootFolder: rootFolder,
	ftp: ``,
}