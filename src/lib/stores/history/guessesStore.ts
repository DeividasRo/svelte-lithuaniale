import { localStorageStore } from '@skeletonlabs/skeleton';
import { get } from 'svelte/store';
import type { Writable } from 'svelte/store';

export const guessesStore: Writable<HistoryGuess[]> = localStorageStore('historyGuessesStore', [])

export const addToGuessesStore = (year: number, difference: number) => {
    const items = get(guessesStore);

    guessesStore.update(() => {
        return [...items, { year: year, difference: difference }];
    });
}

export const resetGuessesStore = () => {
    guessesStore.set([]);
}