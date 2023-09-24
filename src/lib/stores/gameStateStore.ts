import { localStorageStore } from '@skeletonlabs/skeleton';
import { get } from 'svelte/store';
import type { Writable } from 'svelte/store';

type GameState = 'starting' | 'in progress' | 'won' | 'lost'

export const gameStateStore: Writable<GameState> = localStorageStore('gameStateStore', 'starting')


export const setGameStateStore = (state: GameState) => {
    gameStateStore.set(state);
}
