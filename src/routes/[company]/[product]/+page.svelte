<script lang="ts">
	import { base } from '$app/paths';
	import { formatSize } from '$lib/catalog';
	let { data } = $props();
	const c = $derived(data.company);
	const p = $derived(data.product);
	let copied = $state('');
	let q = $state('');
	const files = $derived(p.files.filter((f) => f.name.toLowerCase().includes(q.toLowerCase())));

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
<span class="badge">{p.kind}</span><span class="badge">v{p.version}</span>
<p class="muted">{p.description}</p>

<input type="search" placeholder="Filter files…" bind:value={q} />

<div class="table-scroll">
	<table>
		<thead><tr><th>File</th><th>Arch</th><th>Size</th><th>SHA-256</th><th></th></tr></thead>
		<tbody>
			{#each files as f}
				<tr>
					<td>
						<strong>{f.name}</strong>
						{#if f.description}<div class="muted">{f.description}</div>{/if}
					</td>
					<td>{f.arch ?? '—'}</td>
					<td>{formatSize(f.size)}</td>
					<td>
						<code>{f.sha256.slice(0, 16)}…</code>
						<button class="btn ghost" onclick={() => copy(f.sha256)}>
							{copied === f.sha256 ? 'Copied' : 'Copy'}
						</button>
					</td>
					<td><a class="btn" href="{base}/files/{f.path}" download={f.name}>Download</a></td>
				</tr>
			{:else}
				<tr><td colspan="5" class="muted">No files match.</td></tr>
			{/each}
		</tbody>
	</table>
</div>
