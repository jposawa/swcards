import { PlayerData } from "../types";

export const PAZAAK_PLAYERS_AI: Record<string, PlayerData> = {
	["player-ai-1"]: {
		id: "player-ai-1",
		name: "Player 1",
		email: "player1@domain.co",
		matches: {},
	},
	["player-ai-2"]: {
		id: "player-ai-2",
		name: "Player 2",
		email: "player2@domain.co",
		matches: {},
	},
}

export const PAZAAK_PLAYERS: Record<string, PlayerData> = {
	["player-default-1"]: {
		id: "player-default-1",
		name: "You",
		email: "player1@domain.co",
		matches: {},
	},
};

/**
 * Time to be used by buttons to be disabled
 * The time is set in miliseconds
 */
export const BUTTON_DISABLED_TIME = 800;
