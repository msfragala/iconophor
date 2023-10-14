import { visit } from 'unist-util-visit';
import type { Root, Doctype, ElementContent } from 'xast';
import { fromXml } from 'xast-util-from-xml';
import { toXml } from 'xast-util-to-xml';

export type XastNode = Root | Doctype | ElementContent;
export type Transform = (node: XastNode) => void;

export function transformXml(value: string, fns: Array<Transform | false | null | undefined>) {
	const visitors = fns.filter((fn): fn is Transform => !!fn);

	const xast = fromXml(value);

	visit(xast, (node) => {
		visitors.forEach((fn) => fn(node));
	});

	return toXml(xast);
}
