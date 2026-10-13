export interface Product {
	slug: string;
	name: string;
	kind: 'game' | 'software';
	description: string;
	/** GitHub repo that hosts this product's files as release assets, e.g. "zebraps/example-game" */
	repo: string;
}

export interface Company {
	slug: string;
	name: string;
	tagline: string;
	products: Product[];
}

export interface Asset {
	name: string;
	size: number;
	sha256?: string;
	url: string;
	downloads: number;
}

export interface Release {
	tag: string;
	name: string;
	date: string;
	url: string;
	assets: Asset[];
}

/** Add companies/products here. Each product = one repo; each version = one release; each file = one release asset. */
export const companies: Company[] = [
	{
		slug: 'zebraps',
		name: 'Zebraps',
		tagline: 'The team behind FileVault.',
		products: [
			{
				slug: 'example-game',
				name: 'Example Game',
				kind: 'game',
				description: 'Placeholder entry showing how a game is listed.',
				repo: 'zebraps/example-game'
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
