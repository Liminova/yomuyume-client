enum Routes {
	_404 = "/404",
	Auth = "/auth",
	CompletedReads = "/filter?readingStatus=finished",
	CompletedStories = "/filter?itemStatus=completed",
	ContinueReading = "/filter?readingStatus=reading",
	Filter = "/filter",
	Home = "/",
	Item = "/item/:itemUUID",
	Library = "/library",
	NewlyAdded = "/filter?sortResult=newest%20added",
	RecentlyUpdated = "/filter?sortResult=newest%20updated",
	Settings = "/settings",
}

export default Routes;
