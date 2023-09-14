<script lang="ts">
	// Most of your app wide CSS should be put in this file
	import '../app.postcss';
	import {
		computePosition,
		autoUpdate,
		offset,
		shift,
		flip,
		arrow,
		autoPlacement
	} from '@floating-ui/dom';

	import { storePopup } from '@skeletonlabs/skeleton';
	storePopup.set({ computePosition, autoUpdate, offset, shift, flip, arrow, autoPlacement });
</script>

<svelte:head>
	<title>Lithuaniale</title>
</svelte:head>

<slot />
