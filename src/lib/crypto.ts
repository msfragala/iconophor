export async function createHash(input: string) {
	const buf = await crypto.subtle.digest('SHA-1', new TextEncoder().encode(input));
	return Array.prototype.map
		.call(new Uint8Array(buf), (x) => ('00' + x.toString(16)).slice(-2))
		.join('');
}
