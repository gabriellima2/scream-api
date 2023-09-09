const onlyName = "<h1 id='firstHeading'>any_name</h1>";
const onlyImage = "<figure><a><img src='any_src' /></a></figure>";
const onlyDescription =
	"<div class='mw-parser-output'><p></p><p></p><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p><p>another_content</p><div><p>another</p></div></div>";
const onlyAppearances =
	"<h2><span id='Appearances'></span></h2><ul><li><i><a>Any_Movie</a></i></li></ul>";
const onlyBorn =
	"<div class='pi-data' data-source='born'><h3 class='pi-data-label'>any_value</h3><div class='pi-data-value pi-font'><p>any_value</p></div></div>";
const onlyPersonality =
	"<div class='pi-data' data-source='personality'><h3 class='pi-data-label'>any_title</h3><div class='pi-data-value pi-font'><p>any_value</p></div></div>";
const onlyStatus =
	"<div class='pi-data' data-source='status'><h3 class='pi-data-label'>any_title</h3><div class='pi-data-value pi-font'><p>Unknown</p></div></div>";
const onlyPortrayedBy =
	"<div class='pi-data' data-source='actors/actress'><h3 class='pi-data-label'>any_title</h3><div class='pi-data-value pi-font'><p>any_value</p></div></div>";

export const characterHtml = {
	all: `${onlyName}${onlyImage}${onlyDescription}${onlyBorn}${onlyAppearances}${onlyPersonality}${onlyStatus}${onlyPortrayedBy}`,
	onlyName,
	onlyImage,
	onlyDescription,
	onlyAppearances,
	onlyBorn,
	onlyPortrayedBy,
	onlyStatus,
	onlyPersonality,
};
