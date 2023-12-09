import { faker } from "@faker-js/faker";
import type MyImage from "../types/MyImage";

type Item = {
	author: string;
	categoryUUID: string;
	cover: MyImage;
	dateAdded: number;
	dateUpdated: number;
	description: string;
	itemUUID: string;
	lastRead: number;
	pageRead: number;
	pages: Array<MyImage>;
	releaseDate: number;
	tags: Array<string>;
	title: string;
	titleImagePath: string;
};

type ItemInRecommends = {
	author: string;
	cover: MyImage;
	description: string;
	itemUUID: string;
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

function getRandomAmountOfItems(): Array<Item> {
	function randomItem(): Item {
		return Object.freeze({
			author: faker.internet.userName().replace(".", " "),
			categoryUUID: getRandomCategory().categoryUUID,
			cover,
			dateAdded: getRandomEpoch(),
			dateUpdated: getRandomEpoch(),
			description: faker.lorem.paragraph(10),
			itemUUID: faker.string.uuid(),
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

	return Array.from({ length: faker.number.int({ min: 30, max: 40 }) }, () => randomItem());
}

const items = getRandomAmountOfItems();

function getRandomAmountOfRecommends(): Array<ItemInRecommends> {
	let randomIndexes = Array.from({ length: faker.number.int({ min: 5, max: 10 }) }, () =>
		faker.number.int({ min: 0, max: items.length - 1 })
	);

	randomIndexes = [...new Set(randomIndexes)];

	return randomIndexes.map((index) => {
		const item = items[index];

		return {
			author: item.author,
			cover: item.cover,
			description: item.description,
			itemUUID: item.itemUUID,
			releaseDate: item.releaseDate,
			tags: item.tags,
			title: item.title,
		};
	});
}

const randomRecommends = getRandomAmountOfRecommends();

export type { Item };
export { randomCategories, randomRecommends, items };
