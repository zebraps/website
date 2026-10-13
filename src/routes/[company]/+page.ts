import { error } from '@sveltejs/kit';
import { companies, getCompany } from '$lib/catalog';

export const entries = () => companies.map((c) => ({ company: c.slug }));

export function load({ params }) {
	const company = getCompany(params.company);
	if (!company) error(404, 'Company not found');
	return { company };
}
