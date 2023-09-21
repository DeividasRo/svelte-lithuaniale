import { localStorageStore } from '@skeletonlabs/skeleton';
import { get } from 'svelte/store';
import type { Writable } from 'svelte/store';

export const gameStateStore: Writable<string> = localStorageStore('gameStateStore', 'in progress')

type GameState = 'in progress' | 'won' | 'lost'

export const setGameStateStore = (state: GameState) => {
    gameStateStore.set(state);
}
