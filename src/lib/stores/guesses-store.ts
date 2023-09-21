import { localStorageStore } from '@skeletonlabs/skeleton';
import { get } from 'svelte/store';
import type { Writable } from 'svelte/store';

export const guessesStore: Writable<Guess[]> = localStorageStore('guessesStore', [])

export const addToGuessesStore = (name: string, distance: number) => {
    let items = get(guessesStore);

    guessesStore.update(() => {
        return [...items, { name: name, distance: distance }];
    });
}

export const resetGuessesStore = () => {
    guessesStore.set([]);
}