<script lang="ts">
	import { Autocomplete, popup } from '@skeletonlabs/skeleton';
	import type { AutocompleteOption, PopupSettings } from '@skeletonlabs/skeleton';
	import { createEventDispatcher } from 'svelte';
	import Icon from '@iconify/svelte';

	const dispatch = createEventDispatcher();

	export let inputValue: string;
	export let options: string[];
	export let placeholderText: string;
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
		const inputElement = document.querySelector(
			'input[name="autocomplete-search"]'
		) as HTMLInputElement;
		if (inputElement) {
			inputElement.focus();
		}
	}

	function onInput() {
		if (options.includes(inputValue)) {
			dispatch('input');
		}
	}

	function handleKeyPress(event: KeyboardEvent) {
		if (event.key === 'Enter') {
			onInput();
			const inputElement = document.querySelector(
				'input[name="autocomplete-search"]'
			) as HTMLInputElement;
			if (inputElement) {
				inputElement.blur();
			}
		}
	}
</script>

<div
	class="input-group input-group-divider my-6 h-12 min-h-[3rem] w-80 max-w-sm grid-cols-[85%_15%] drop-shadow-xl sm:my-9 sm:w-full sm:max-w-sm"
>
	<input
		type="search"
		name="autocomplete-search"
		class="autocomplete search pl-4 text-center text-lg font-semibold outline-none sm:text-xl"
		spellcheck="false"
		placeholder={placeholderText}
		bind:value={inputValue}
		use:popup={popupSettings}
		on:keypress={handleKeyPress}
	/>
	<button
		class="variant-filled-secondary !pl-3 !pr-2 outline-none active:opacity-80"
		on:click={() => {
			onInput();
		}}
	>
		<Icon color="#035c09" width="32" icon="akar-icons:send" />
	</button>
</div>
<div
	class="text-md card z-20 -mt-2 ml-[0.7rem] max-h-32 w-[15.5rem] overflow-y-auto rounded-none rounded-b-lg border-2 border-t-0 border-primary-700 !bg-tertiary-600 py-1 font-semibold sm:ml-[0.6rem] sm:max-h-56 sm:w-[19rem] sm:text-lg"
	tabindex="-1"
	data-popup="popupAutocomplete"
>
	<Autocomplete bind:input={inputValue} options={flavorOptions} on:selection={onFlavorSelection} />
</div>
