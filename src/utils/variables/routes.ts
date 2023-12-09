enum Routes {
	Auth = "/auth",
	CompletedReads = "/filter?readingStatus=finished",
	CompletedStories = "/filter?itemStatus=completed",
	ContinueReading = "/filter?readingStatus=reading",
	Home = "/",
	Library = "/library",
	NewlyAdded = "/filter?sortResult=newest%20added",
	RecentlyUpdated = "/filter?sortResult=newest%20updated",
	Settings = "/settings",
	Item = "/item/:itemUUID",
	Filter = "/filter",
	FourOhFour = "/404",
}

export default Routes;
