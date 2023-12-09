enum FilterReadingStatus {
	Reading = "reading",
	Finished = "finished",
	NotOpened = "haven't opened",
}

enum FilterSortResult {
	NewestAdded = "newest added",
	NewestUpdated = "newest updated",
}

enum FilterItemStatus {
	Ongoing = "ongoing",
	Completed = "completed",
}

export { FilterReadingStatus, FilterSortResult, FilterItemStatus };
