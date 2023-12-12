enum Routes {
	_404 = "/404",
	Auth = "/auth",
	CompletedReads = "/filter?readingStatus=finished",
	CompletedStories = "/filter?titleStatus=completed",
	ContinueReading = "/filter?readingStatus=reading",
	Filter = "/filter",
	Home = "/",
	Title = "/title/:titleId",
	Library = "/library",
	NewlyAdded = "/filter?sortResult=newest%20added",
	RecentlyUpdated = "/filter?sortResult=newest%20updated",
	Settings = "/settings",
}

export default Routes;
