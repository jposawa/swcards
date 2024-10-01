import { PlayerData } from "../types";

export const PAZAAK_PLAYERS: PlayerData[] = [
	{
		id: "1",
		name: "Player 1",
		email: "player1@domain.co",
		matches: {},
	},
	{
		id: "2",
		name: "Player 2",
		email: "player2@domain.co",
		matches: {},
	},
];

/**
 * Time to be used by buttons to be disabled
 * The time is set in miliseconds
 */
export const BUTTON_DISABLED_TIME = 800;
