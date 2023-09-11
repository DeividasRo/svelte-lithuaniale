<script lang="ts">
	import { Autocomplete, popup } from '@skeletonlabs/skeleton';
	import type { AutocompleteOption, PopupSettings } from '@skeletonlabs/skeleton';
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	export let inputValue: string;
	export let options: string[];
	let inputRef: HTMLInputElement;
	const flavorOptions: AutocompleteOption[] = [];

	options.forEach((optionName) => flavorOptions.push({ label: optionName, value: optionName }));

	let popupSettings: PopupSettings = {
		event: 'focus-click',
		target: 'popupAutocomplete',
		placement: 'bottom'
	};

	function onFlavorSelection(event: CustomEvent<AutocompleteOption>): void {
		inputRef.focus();
		inputValue = event.detail.label;
	}

	function onInput() {
		dispatch('input');
	}
</script>

<input
	type="search"
	name="autocomplete-search"
	class="autocomplete input my-10 h-12 max-w-md p-4 text-center text-xl outline-none drop-shadow-xl"
	placeholder="Enter a city in Lithuania..."
	bind:this={inputRef}
	bind:value={inputValue}
	use:popup={popupSettings}
	on:keydown={(e) => {
		if (e.key === 'Enter') {
			onInput();
		}
	}}
/>
<div
	class="card z-20 -mt-2 max-h-60 w-full max-w-xs overflow-y-auto rounded-none rounded-b-lg border-2 border-t-0 border-primary-700 !bg-tertiary-600 p-2 text-lg font-semibold"
	tabindex="-1"
	data-popup="popupAutocomplete"
>
	<Autocomplete bind:input={inputValue} options={flavorOptions} on:selection={onFlavorSelection} />
</div>
