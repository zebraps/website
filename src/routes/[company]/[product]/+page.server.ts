import { error } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';
import { companies, getCompany, getProduct, type Release } from '$lib/catalog';

export const prerender = true;

export const entries = () =>
	companies.flatMap((c) => c.products.map((p) => ({ company: c.slug, product: p.slug })));

// Runs only at build time, so visitors never hit the GitHub API rate limit.
async function fetchReleases(repo: string): Promise<Release[]> {
	const headers: Record<string, string> = { Accept: 'application/vnd.github+json' };
	if (env.GITHUB_TOKEN) headers.Authorization = `Bearer ${env.GITHUB_TOKEN}`;

	const releases: Release[] = [];
	for (let page = 1; ; page++) {
		const res = await fetch(
			`https://api.github.com/repos/${repo}/releases?per_page=100&page=${page}`,
			{ headers }
		);
		if (res.status === 404) return releases; // repo not created yet
		if (!res.ok) throw new Error(`GitHub API ${res.status} for ${repo}`);
		const batch = await res.json();
		for (const r of batch) {
			if (r.draft) continue;
			releases.push({
				tag: r.tag_name,
				name: r.name || r.tag_name,
				date: r.published_at,
				url: r.html_url,
				assets: r.assets.map((a: any) => ({
					name: a.name,
					size: a.size,
					sha256: a.digest?.startsWith('sha256:') ? a.digest.slice(7) : undefined,
					url: a.browser_download_url,
					downloads: a.download_count
				}))
			});
		}
		if (batch.length < 100) return releases;
	}
}

export async function load({ params }) {
	const company = getCompany(params.company);
	const product = getProduct(params.company, params.product);
	if (!company || !product) error(404, 'Product not found');
	return { company, product, releases: await fetchReleases(product.repo) };
}
