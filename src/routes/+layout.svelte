<script lang="ts">
	import { base } from '$app/paths';
	import '../app.css';
	let { children } = $props();
</script>

<header>
	<div class="wrap bar">
		<a class="logo" href="{base}/">
			<span class="mark">▞</span> FileVault
		</a>
		<nav>
			<a href="{base}/">Browse</a>
			<a href="{base}/about/">About</a>
		</nav>
	</div>
</header>

<main class="wrap">{@render children()}</main>

<footer>
	<div class="wrap">© {new Date().getFullYear()} Zebraps · FileVault — individual files for analysis.</div>
</footer>
