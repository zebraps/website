<script lang="ts">
	import { base } from '$app/paths';
	let { data } = $props();
	const c = $derived(data.company);
</script>

<svelte:head><title>{c.name} — FileVault</title></svelte:head>

<div class="crumbs"><a href="{base}/">FileVault</a> / {c.name}</div>
<h1>{c.name}</h1>
<p class="muted">{c.tagline}</p>

<div class="grid">
	{#each c.products as p}
		<a class="card" href="{base}/{c.slug}/{p.slug}/">
			<h3>{p.name}</h3>
			<span class="badge">{p.kind}</span>
			<p class="muted">{p.description}</p>
		</a>
	{/each}
</div>
