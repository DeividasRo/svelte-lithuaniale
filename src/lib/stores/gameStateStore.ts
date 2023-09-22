import { localStorageStore } from '@skeletonlabs/skeleton';
import { get } from 'svelte/store';
import type { Writable } from 'svelte/store';

export const gameStateStore: Writable<string> = localStorageStore('gameStateStore', 'starting')

type GameState = 'starting' | 'in progress' | 'won' | 'lost'

export const setGameStateStore = (state: GameState) => {
    gameStateStore.set(state);
}
