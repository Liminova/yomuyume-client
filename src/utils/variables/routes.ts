enum Routes {
	_404 = "/404",
	Auth = "/auth",
	Category = "/category/:categoryId",
	CompletedReads = "/filter?readingStatus=finished",
	CompletedStories = "/filter?titleStatus=completed",
	ContinueReading = "/filter?readingStatus=reading",
	Filter = "/filter",
	Home = "/",
	Library = "/library",
	NewlyAdded = "/filter?sortResult=newest%20added",
	RecentlyUpdated = "/filter?sortResult=newest%20updated",
	Settings = "/settings",
	Title = "/title/:titleId",
}

export default Routes;
