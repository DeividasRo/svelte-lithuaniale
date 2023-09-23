import { localStorageStore } from '@skeletonlabs/skeleton';
import { get } from 'svelte/store';
import type { Writable } from 'svelte/store';
import shuffle from 'fast-shuffle'

export const answerStore: Writable<string> = localStorageStore('answerStore', 'Kaunas')

export const setAnswerStore = (options: string[], index: number) => {
    const shuffleOptions = shuffle(99);
    let shuffledOptions = shuffleOptions(options);
    answerStore.set(shuffledOptions[index]);
}

