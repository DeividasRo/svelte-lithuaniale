import { localStorageStore } from '@skeletonlabs/skeleton';
import { get } from 'svelte/store';
import type { Writable, Readable } from 'svelte/store';

export const startDateStore: Readable<Date> = localStorageStore('startDateStore', new Date('23 Sep 2023'));

export const savedDateStore: Writable<Date> = localStorageStore('savedDateStore', new Date('23 Sep 2023'));


export const updateSavedDateStore = () => {
    savedDateStore.set(new Date());
}
