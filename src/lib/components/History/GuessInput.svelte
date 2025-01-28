<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import Icon from '@iconify/svelte';

	const dispatch = createEventDispatcher();

	export let inputValue: string;
	export let placeholderText: string;

	function onInput() {
		const numValue = Number(inputValue);
		if (!isNaN(numValue) && numValue >= 1 && numValue <= 2025) {
			dispatch('input');
		}
	}
	function handleInput(e: Event) {
		const target = e.target as HTMLInputElement;
		if (target && target.value.length > 4) {
			target.value = target.value.slice(0, 4);
		}
		target.value = String(Number(target.value));
		if (Number(target.value) > 2025) {
			target.value = '2025';
			inputValue = '2025';
		}
		if (Number(target.value) < 1) {
			target.value = '1';
			inputValue = '';
		}
	}
</script>

<div
	class="h-15 input-group input-group-divider my-9 min-h-[3rem] w-52 max-w-sm grid-cols-[75%_25%] drop-shadow-xl"
>
	<input
		type="number"
		name="input"
		min="1"
		max="2025"
		class="no-arrows pl-16 text-left text-2xl font-semibold outline-none"
		placeholder={placeholderText}
		bind:value={inputValue}
		on:input={handleInput}
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
