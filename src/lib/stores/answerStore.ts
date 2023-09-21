import { localStorageStore } from '@skeletonlabs/skeleton';
import { get } from 'svelte/store';
import type { Writable } from 'svelte/store';

export const answerStore: Writable<string> = localStorageStore('answerStore', 'Vilnius')

export const resetAnswerStore = (options: string[]) => {
    answerStore.set(options[Math.floor(Math.random() * options.length)])
}

