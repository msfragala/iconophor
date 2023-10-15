import {
	FeatherIcons,
	FontAwesome,
	Heroicons,
	MaterialDesign,
	SanityIcons,
	hasStyleParam,
	libraries,
} from './libraries';

export const libraryOptions = [
	{
		key: Heroicons.id,
		name: Heroicons.name,
		version: '2.0.18',
		styles: ['outline', 'solid'],
	},
	{
		key: FeatherIcons.id,
		name: FeatherIcons.name,
		version: '4.29.1',
		styles: [],
	},
	{
		key: MaterialDesign.id,
		name: MaterialDesign.name,
		version: '0.14.13',
		styles: ['outlined', 'rounded', 'sharp', 'filled', 'two-tone'],
	},
	{
		key: FontAwesome.id,
		name: FontAwesome.name,
		version: '6.4.2',
		styles: ['regular', 'solid'],
	},
	{
		key: SanityIcons.id,
		name: SanityIcons.name,
		version: '2.5.0',
		styles: [],
	},
];

export function createIconPath(options: {
	library?: string;
	version?: string;
	icon?: string;
	style?: string;
	params?: URLSearchParams;
}) {
	if (!options.library) return;
	if (!options.version) return;
	if (!options.icon) return;
	const library = libraries.find((l) => l.id === options.library);

	if (!library) return;
	if (library.urlPattern.includes(':style') && !options.style) return;

	const version = encodeURIComponent(options.version);
	const icon = encodeURIComponent(options.icon);
	const style = encodeURIComponent(options.style ?? '');

	let path = hasStyleParam(library.id)
		? `/icons/${library.id}/${version}/${style}/${icon}`
		: `/icons/${library.id}/${version}/${icon}`;

	if (options.params) {
		path += `?${options.params}`;
	}

	return path;
}
