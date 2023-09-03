import { localStorageStore } from '@skeletonlabs/skeleton';
import type { Writable } from 'svelte/store';

export const guessStore: Writable<Guess[]> = localStorageStore('guessStore', [{ name: "Test City", distance: 149 }])

export const addToGuessStore = (name: string) => { }

export const resetGuessStore = () => { }