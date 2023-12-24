import { createVersionedHandler } from '@/lib/versioned-handler';

export const GET = createVersionedHandler({
	versionParam: 'version',
	segmentsParam: 'segments',
	patterns: [
		{
			version: '2.1.1',
			from: '/:size(24|20|16)/:style(solid|outline)/:icon',
			to: `https://raw.githubusercontent.com/tailwindlabs/heroicons/v:version/optimized/:size/:style/:icon.svg`,
		},
		{
			version: '0.2.0',
			from: '/:style(solid|outline)/:icon',
			to: `https://raw.githubusercontent.com/tailwindlabs/heroicons/v:version/optimized/24/:style/:icon.svg`,
		},
	],
});
