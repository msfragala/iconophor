export const attributeParams = [
	'fill',
	'stroke',
	'width',
	'height',
	'color',
	'fill-opacity',
	'fill-rule',
	'stroke-dasharray',
	'stroke-dashoffset',
	'stroke-linecap',
	'stroke-linejoin',
	'stroke-miterlimit',
	'stroke-opacity',
	'stroke-width',
] as const;

export const allParams = [...attributeParams, 'replace-colors', 'symbol'];
