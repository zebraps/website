<script lang="ts">
	import { base } from '$app/paths';
	import { companies } from '$lib/catalog';

	let q = $state('');
	const results = $derived(
		companies
			.map((c) => ({
				...c,
				products: c.products.filter((p) =>
					`${c.name} ${p.name}`
						.toLowerCase()
						.includes(q.toLowerCase())
				)
			}))
			.filter((c) => c.products.length)
	);
</script>

<svelte:head><title>FileVault — by Zebraps</title></svelte:head>

<h1>Grab only the files you need.</h1>
<p class="muted">
	FileVault hosts individual game and software files so reverse engineers can download just the
	binaries they want to analyze — not the whole install.
</p>

<input type="search" placeholder="Search companies or products…" bind:value={q} />

{#each results as c}
	<h2><a href="{base}/{c.slug}/">{c.name}</a></h2>
	<div class="grid">
		{#each c.products as p}
			<a class="card" href="{base}/{c.slug}/{p.slug}/">
				<h3>{p.name}</h3>
				<span class="badge">{p.kind}</span>
				<p class="muted">{p.description}</p>
			</a>
		{/each}
	</div>
{:else}
	<p class="muted">No matches.</p>
{/each}
