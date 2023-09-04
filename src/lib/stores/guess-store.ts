import { localStorageStore } from '@skeletonlabs/skeleton';
import { get } from 'svelte/store';
import type { Writable } from 'svelte/store';

export const guessStore: Writable<Guess[]> = localStorageStore('guessStore', [])

export const addToGuessStore = (name: string, distance: number) => {
    let items = get(guessStore);

    guessStore.update(() => {
        return [...items, { name: name, distance: distance }];
    });
}

export const resetGuessStore = () => {
    guessStore.set([]);
}