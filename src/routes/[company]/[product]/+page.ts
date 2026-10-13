import { error } from '@sveltejs/kit';
import { companies, getCompany, getProduct } from '$lib/catalog';

export const entries = () =>
	companies.flatMap((c) => c.products.map((p) => ({ company: c.slug, product: p.slug })));

export function load({ params }) {
	const company = getCompany(params.company);
	const product = getProduct(params.company, params.product);
	if (!company || !product) error(404, 'Product not found');
	return { company, product };
}
