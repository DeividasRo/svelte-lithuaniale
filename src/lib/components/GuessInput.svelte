<script lang="ts">
	import { Autocomplete, popup } from '@skeletonlabs/skeleton';
	import type { AutocompleteOption, PopupSettings } from '@skeletonlabs/skeleton';
	import { createEventDispatcher } from 'svelte';
	import Icon from '@iconify/svelte';

	const dispatch = createEventDispatcher();

	export let inputValue: string;
	export let options: string[];
	let flavorOptions: AutocompleteOption[] = [];

	$: options, refillFlavorOptions();

	function refillFlavorOptions() {
		flavorOptions = [];
		options.forEach((optionName) => {
			flavorOptions.push({ label: optionName, value: optionName });
		});
	}

	let popupSettings: PopupSettings = {
		event: 'focus-click',
		target: 'popupAutocomplete',
		placement: 'bottom',
		middleware: {
			autoPlacement: { allowedPlacements: ['bottom'] }
		}
	};

	function onFlavorSelection(event: CustomEvent<AutocompleteOption>): void {
		inputValue = event.detail.label;
	}

	function onInput() {
		if (options.includes(inputValue)) {
			dispatch('input');
		}
	}
</script>

<div
	class=" input-group input-group-divider my-5 h-12 min-h-[3rem] max-w-xs grid-cols-[85%_15%] drop-shadow-xl md:my-10 md:max-w-sm"
>
	<input
		type="search"
		name="autocomplete-search"
		class="autocomplete search pl-6 text-left text-xl outline-none"
		placeholder="Enter a city in Lithuania..."
		bind:value={inputValue}
		use:popup={popupSettings}
	/>
	<button
		class="variant-filled-secondary !pl-3 !pr-2 outline-none active:opacity-90"
		on:click={() => {
			onInput();
		}}
	>
		<Icon color="#035c09" width="32" icon="akar-icons:send" />
	</button>
</div>
<div
	class="text-md card z-20 -mt-2 ml-[0.6rem] max-h-32 w-[15.5rem] overflow-y-auto rounded-none rounded-b-lg border-2 border-t-0 border-primary-700 !bg-tertiary-600 p-1 font-semibold md:ml-[0.6rem] md:max-h-56 md:w-[19rem] md:text-lg"
	tabindex="-1"
	data-popup="popupAutocomplete"
>
	<Autocomplete bind:input={inputValue} options={flavorOptions} on:selection={onFlavorSelection} />
</div>
