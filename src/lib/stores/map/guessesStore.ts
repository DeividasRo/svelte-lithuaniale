import { localStorageStore } from '@skeletonlabs/skeleton';
import { get } from 'svelte/store';
import type { Writable } from 'svelte/store';

export const guessesStore: Writable<MapGuess[]> = localStorageStore('mapGuessesStore', [])

export const addToGuessesStore = (name: string, distance: number) => {
    const items = get(guessesStore);

    guessesStore.update(() => {
        return [...items, { name: name, distance: distance }];
    });
}

export const resetGuessesStore = () => {
    guessesStore.set([]);
}