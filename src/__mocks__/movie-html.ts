const onlyName = "<h1 id='firstHeading'>any_name</h1>";
const onlyImage = "<figure><a><img src='any_src' /></a></figure>";
const onlySynopsis =
	"<div><h3><span id='Synopsis'></span></h3><p>any_synopsis</p></div>";
const onlyCharacters =
	"<div><h3><span id='Main_characters'>Main characters</span></h3><ul><li><a></a><a>any_character</a></li></ul></div>";
const onlyDirectors =
	"<div data-source='director'><h3 class='pi-data-label'>any_title</h3><div class='pi-data-value pi-font'><p>any_value</p></div></div>";
const onlyWriters =
	"<div data-source='writer'><h3 class='pi-data-label'>any_title</h3><div class='pi-data-value pi-font'><p>any_value</p></div></div>";
const onlyProducers =
	"<div data-source='producer'><h3 class='pi-data-label'>any_title</h3><div class='pi-data-value pi-font'><p>any_value</p></div></div>";
const onlyComposer =
	"<div data-source='composer'><h3 class='pi-data-label'>any_title</h3><div class='pi-data-value pi-font'><p>any_value</p></div></div>";
const onlyReleaseDate =
	"<div data-source='release'><h3 class='pi-data-label'>any_title</h3><div class='pi-data-value pi-font'><p>any_value</p></div></div>";
const onlyBoxOffice =
	"<div data-source='boxoffice'><h3 class='pi-data-label'>any_title</h3><div class='pi-data-value pi-font'><p>any_value</p></div></div>";
const onlyRunningTime =
	"<div data-source='runtime'><h3 class='pi-data-label'>any_title</h3><div class='pi-data-value pi-font'><p>any_value</p></div></div>";

export const movieHtml = {
	all: `${onlyName}${onlyImage}${onlySynopsis}${onlyCharacters}${onlyDirectors}${onlyWriters}${onlyProducers}${onlyComposer}${onlyReleaseDate}${onlyBoxOffice}${onlyRunningTime}`,
	onlyName,
	onlyImage,
	onlySynopsis,
	onlyCharacters,
	onlyDirectors,
	onlyWriters,
	onlyProducers,
	onlyComposer,
	onlyReleaseDate,
	onlyBoxOffice,
	onlyRunningTime,
};
