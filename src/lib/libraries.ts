export const FeatherIcons = {
	id: 'feather',
	name: 'Feather Icons',
	urlPattern: 'iconophor.com/icons/feather/:version/:icon',
	github: 'https://github.com/feathericons/feather',
	homepage: 'https://feathericons.com',
	unpkg: 'https://unpkg.com/feather-icons/',
} as const;

export const MaterialDesign = {
	id: 'material',
	name: 'Material Design',
	urlPattern: 'iconophor.com/icons/material/:version/:style/:icon',
	github: 'https://github.com/google/material-design-icons',
	homepage: 'https://fonts.google.com/icons',
	unpkg: 'https://unpkg.com/@material-design-icons/svg/',
} as const;

export const FontAwesome = {
	id: 'fontawesome',
	name: 'Font Awesome',
	urlPattern: 'iconophor.com/icons/fontawesome/:version/:style/:icon',
	github: 'https://github.com/FortAwesome/Font-Awesome',
	homepage: 'https://fontawesome.com',
	unpkg: 'https://unpkg.com/@fortawesome/fontawesome-free/',
} as const;

export const Heroicons = {
	id: 'heroicons',
	name: 'Heroicons',
	urlPattern: 'iconophor.com/icons/heroicons/:version/:style/:icon',
	github: 'https://github.com/tailwindlabs/heroicons',
	homepage: 'https://heroicons.com',
	unpkg: 'https://unpkg.com/heroicons/',
} as const;

export const SanityIcons = {
	id: 'sanity-icons',
	name: '@sanity/icons',
	urlPattern: 'iconophor.com/icons/sanity-icons/:version/:icon',
	github: 'https://github.com/sanity-io/icons',
	homepage: 'https://www.sanity.io/ui',
	unpkg: 'https://unpkg.com/@sanity/icons/',
} as const;

export const libraries = [
	FeatherIcons,
	FontAwesome,
	Heroicons,
	MaterialDesign,
	SanityIcons,
] as const;

export function hasStyleParam(value: string) {
	const library = libraries.find((l) => l.id === value);
	return !!library?.urlPattern.includes(':style');
}
