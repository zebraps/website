export interface VaultFile {
	name: string;
	/** Path relative to static/files, e.g. "zebraps/example-game/1.0.0/game.dll" */
	path: string;
	size: number; // bytes
	sha256: string;
	description?: string;
	arch?: 'x86' | 'x64' | 'arm64' | 'any';
}

export interface Product {
	slug: string;
	name: string;
	version: string;
	kind: 'game' | 'software';
	description: string;
	files: VaultFile[];
}

export interface Company {
	slug: string;
	name: string;
	tagline: string;
	website?: string;
	products: Product[];
}

/**
 * Catalog of hosted files. Put the real file in static/files/<path>
 * and add an entry here. Entries below are placeholders — replace them.
 */
export const companies: Company[] = [
	{
		slug: 'zebraps',
		name: 'Zebraps',
		tagline: 'The team behind FileVault.',
		products: [
			{
				slug: 'example-game',
				name: 'Example Game',
				version: '1.0.0',
				kind: 'game',
				description: 'Placeholder entry showing how a game is listed.',
				files: [
					{
						name: 'GameAssembly.dll',
						path: 'zebraps/example-game/1.0.0/GameAssembly.dll',
						size: 48234496,
						sha256: '0000000000000000000000000000000000000000000000000000000000000000',
						description: 'Main game logic module',
						arch: 'x64'
					},
					{
						name: 'UnityPlayer.dll',
						path: 'zebraps/example-game/1.0.0/UnityPlayer.dll',
						size: 29884416,
						sha256: '1111111111111111111111111111111111111111111111111111111111111111',
						arch: 'x64'
					}
				]
			}
		]
	}
];

export const getCompany = (slug: string) => companies.find((c) => c.slug === slug);
export const getProduct = (c: string, p: string) =>
	getCompany(c)?.products.find((x) => x.slug === p);

export function formatSize(bytes: number): string {
	const u = ['B', 'KB', 'MB', 'GB'];
	let i = 0;
	let n = bytes;
	while (n >= 1024 && i < u.length - 1) {
		n /= 1024;
		i++;
	}
	return `${n.toFixed(i ? 1 : 0)} ${u[i]}`;
}
