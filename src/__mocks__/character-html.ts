const onlyName = "<h1 id='firstHeading'>any_name</h1>";
const onlyImage = "<figure><a><img src='any_src' /></a></figure>";
const onlyDescription =
	"<div class='mw-parser-output'><p></p><p></p><p>any_description</p><p>another_content</p><div><p>another</p></div></div>";
const onlyOverview = "";
const onlyAppearances =
	"<h2><span id='Appearances'></span></h2><ul><li><i><a>any_movie</a></i></li></ul>";

export const characterHtml = {
	all: `${onlyName}${onlyImage}${onlyDescription}${onlyOverview}${onlyAppearances}`,
	onlyName,
	onlyImage,
	onlyDescription,
	onlyOverview,
	onlyAppearances,
};
