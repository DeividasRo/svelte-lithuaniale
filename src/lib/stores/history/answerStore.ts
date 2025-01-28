import { localStorageStore } from '@skeletonlabs/skeleton';
import type { Writable } from 'svelte/store';

export const answerStore: Writable<number> = localStorageStore('historyAnswerStore', 1990)

export const setAnswerStore = (options: number[], index: number) => {
    const shuffledOptions = shuffle(options, 9328);
    answerStore.set(shuffledOptions[index]);
}


function shuffle(arr: number[], seed: number) {
    const arrt = [...arr];
    const tt = arrt.length;
    let tem;
    let j;
    for (let i = 0; i < tt; i++) {
        j = (seed % (i + 1) + i) % tt;
        tem = arrt[i];
        arrt[i] = arrt[j];
        arrt[j] = tem;
    }
    return arrt;
}

