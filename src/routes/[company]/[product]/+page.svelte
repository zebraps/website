<script lang="ts">
	import { base } from '$app/paths';
	import { formatSize } from '$lib/catalog';
	let { data } = $props();
	const c = $derived(data.company);
	const p = $derived(data.product);
	let copied = $state('');
	let q = $state('');
	const releases = $derived(
		data.releases
			.map((r) => ({
				...r,
				assets: r.assets.filter((a) => a.name.toLowerCase().includes(q.toLowerCase()))
			}))
			.filter((r) => r.assets.length)
	);

	async function copy(hash: string) {
		await navigator.clipboard.writeText(hash);
		copied = hash;
		setTimeout(() => (copied = ''), 1500);
	}
</script>

<svelte:head><title>{p.name} — {c.name} — FileVault</title></svelte:head>

<div class="crumbs">
	<a href="{base}/">FileVault</a> / <a href="{base}/{c.slug}/">{c.name}</a> / {p.name}
</div>
<h1>{p.name}</h1>
<span class="badge">{p.kind}</span>
<p class="muted">{p.description}</p>

<input type="search" placeholder="Filter files…" bind:value={q} />

{#each releases as r}
	<h2>{r.name} <span class="badge">{new Date(r.date).toLocaleDateString('en-GB')}</span></h2>
	<div class="table-scroll">
		<table>
			<thead><tr><th>File</th><th>Size</th><th>SHA-256</th><th></th></tr></thead>
			<tbody>
				{#each r.assets as a}
					<tr>
						<td><strong>{a.name}</strong></td>
						<td>{formatSize(a.size)}</td>
						<td>
							{#if a.sha256}
								<code>{a.sha256.slice(0, 16)}…</code>
								<button class="btn ghost" onclick={() => copy(a.sha256!)}>
									{copied === a.sha256 ? 'Copied' : 'Copy'}
								</button>
							{:else}—{/if}
						</td>
						<td><a class="btn" href={a.url}>Download</a></td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
{:else}
	<p class="muted">No files published yet.</p>
{/each}
