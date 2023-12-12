import { faker } from "@faker-js/faker";
import type MyImage from "../types/MyImage";

type Title = {
	author: string;
	categoryId: string;
	cover: MyImage;
	dateAdded: number;
	dateUpdated: number;
	description: string;
	id: string;
	lastRead: number;
	pageRead: number;
	pages: Array<MyImage>;
	releaseDate: number;
	tags: Array<string>;
	title: string;
	titleImagePath: string;
};

type TitleInRecommends = {
	author: string;
	cover: MyImage;
	description: string;
	id: string;
	releaseDate: number;
	tags: Array<string>;
	title: string;
};

const cover: MyImage = {
	blurhash: "MWH_*]9FJ8-:ni?wROROo#bIXnj[s.IVoz",
	format: "avif",
	height: 368,
	src: "https://cdn.jsdelivr.net/gh/Delnegend/assets/dog.avif",
	width: 599,
};

function getRandomAmountOfPages(): Array<MyImage> {
	const page: MyImage = {
		src: "https://cdn.jsdelivr.net/gh/Delnegend/assets/page.jxl",
		width: 2500,
		height: 4000,
		format: "jxl",
		blurhash: "cQNc?4oz?^.SV@V@.mofZ$QmoztlbwaxW;",
	};

	return Array.from({ length: faker.number.float({ min: 30, max: 40 }) }, () => page);
}

const randomCategories = Array.from({ length: 25 }, () => ({
	categoryUUID: faker.string.uuid(),
	title: faker.lorem.words(1),
	description: faker.lorem.paragraph(10),
	cover,
}));

function getRandomCategory(): typeof randomCategories[number] {
	const randomIndex = faker.number.int({ min: 0, max: randomCategories.length - 1 });

	return randomCategories[randomIndex];
}

function getRandomEpoch(): number {
	return Math.floor(faker.date.past().getTime() / 1000);
}

function getRandomAmountOfTitles(): Array<Title> {
	function randomTitle(): Title {
		return Object.freeze({
			author: faker.internet.userName().replace(".", " "),
			categoryId: getRandomCategory().categoryUUID,
			cover,
			dateAdded: getRandomEpoch(),
			dateUpdated: getRandomEpoch(),
			description: faker.lorem.paragraph(10),
			id: faker.string.uuid(),
			lastRead: getRandomEpoch(),
			pageRead: faker.number.float({ min: 0, max: 1 }),
			pages: getRandomAmountOfPages(),
			releaseDate: getRandomEpoch(),
			tags: faker.lorem.words(5).split(" "),
			title: faker.lorem.words(3),
			titleImagePath: "https://cdn.jsdelivr.net/gh/Delnegend/assets/title.png",
			readProgress: faker.number.float({ min: 0, max: 1 }),
		});
	}

	return Array.from({ length: faker.number.int({ min: 30, max: 40 }) }, () => randomTitle());
}

const titles = getRandomAmountOfTitles();

function getRandomAmountOfRecommends(): Array<TitleInRecommends> {
	let randomIndexes = Array.from({ length: faker.number.int({ min: 5, max: 10 }) }, () =>
		faker.number.int({ min: 0, max: titles.length - 1 })
	);

	randomIndexes = [...new Set(randomIndexes)];

	return randomIndexes.map((index) => {
		const title = titles[index];

		return {
			author: title.author,
			cover: title.cover,
			description: title.description,
			id: title.id,
			releaseDate: title.releaseDate,
			tags: title.tags,
			title: title.title,
		};
	});
}

const randomRecommends = getRandomAmountOfRecommends();

export type { Title };
export { randomCategories, randomRecommends, titles };
