import { localStorageStore } from '@skeletonlabs/skeleton';
import { get } from 'svelte/store';
import type { Writable } from 'svelte/store';

type Language = 'lithuania' | 'united-kingdom'

export const languageStore: Writable<Language> = localStorageStore('languageStore', 'lithuania')


export const setLanguageStore = (language: Language) => {
    languageStore.set(language);
}