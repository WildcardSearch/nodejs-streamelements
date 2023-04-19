/**
 * nodejs-streamelements by WildcardSearch
 *
 * node-streamelements drop-in replacement w/o request module (node-fetch instead)
 */

const fetch = require("node-fetch");
const HTTP = { GET: 'GET', POST: 'POST', PUT: 'PUT', DELETE: 'DELETE' };

class StreamElements {
	base = "";
	jwt = "";
	accountId = "";

	/**
	 * @param  Object
	 * @return void
	 */
	constructor(options)
	{
		// Establish the base URL for the API.
		this.base = options.base || 'https://api.streamelements.com/kappa/v2';

		// Store the user's access token in the instance.
		this.jwt = options.token;

		// Store the account ID of the channel we're accessing.
		this.accountId = options.accountId;
	}

	/**
	 * perform the request
	 *
	 * @param  String
	 * @param  String
	 * @param  Object
	 * @param  Object
	 * @return Promise
	 */
	makeRequest(method, path, body, qs)
	{
		return new Promise((resolve, reject) => {
			fetch(`${this.base}/${path}`, {
				method,
				body,
				url: `${this.base}/${path}` + new URLSearchParams(qs || {}),
				headers: {
				  'Authorization': `Bearer ${this.jwt}`
				}
			})
			.then(res => res.json())
			.then(json => {
				console.log(json);

				return resolve(json);
			})
			.catch(err => {
				console.log(err);

				return reject(err);
			});
		});
	}

	/* activities */

	/**
	 * @param  String
	 * @return Promise
	 */
	getActivities(channel = this.accountId)
	{
		return this.makeRequest(HTTP.GET, `activities/${channel}`);
	}

	/**
	 * @param  String
	 * @param  String
	 * @return Promise
	 */
	getActivity(activityId, channel = this.accountId)
	{
		return this.makeRequest(HTTP.GET, `activities/${channel}/${activityId}`);
	}

	/**
	 * @param  String
	 * @param  String
	 * @return Promise
	 */
	replayActivity(activityId, channel = this.accountId)
	{
		return this.makeRequest(HTTP.POST, `activities/${channel}/${activityId}/replay`);
	}

	/* bot */

	/**
	 * @param  String
	 * @return Promise
	 */
	getBotStatus(channel = this.accountId)
	{
		return this.makeRequest(HTTP.GET, `bot/${channel}`);
	}

	/**
	 * @param  String
	 * @return Promise
	 */
	botPartChannel(channel = this.accountId)
	{
		return this.makeRequest(HTTP.POST, `bot/${channel}/part`);
	}

	/**
	 * @param  String
	 * @return Promise
	 */
	botSay(message, channel = this.accountId)
	{
		return this.makeRequest(HTTP.POST, `bot/${channel}/say`, { message });
	}

	/**
	 * @param  String
	 * @return Promise
	 */
	botJoinChannel(channel = this.accountId)
	{
		return this.makeRequest(HTTP.POST, `bot/${channel}/join`);
	}

	/**
	 * @param  String
	 * @return Promise
	 */
	botMute(channel = this.accountId)
	{
		return this.makeRequest(HTTP.POST, `bot/${channel}/mute`);
	}

	/**
	 * @param  String
	 * @return Promise
	 */
	botUnmute(channel = this.accountId)
	{
		return this.makeRequest(HTTP.POST, `bot/${channel}/unmute`);
	}

	/**
	 * @param  String
	 * @return Promise
	 */
	getBotUserLevels(channel = this.accountId)
	{
		return this.makeRequest(HTTP.GET, `bot/${channel}/levels`);
	}

	/**
	 * @param  String
	 * @param  String
	 * @param  String
	 * @return Promise
	 */
	setBotUserLevel(username, level, channel = this.accountId)
	{
		return this.makeRequest(HTTP.POST, `bot/${channel}/levels`, { username, level });
	}

	/**
	 * @param  String
	 * @param  String
	 * @return Promise
	 */
	deleteBotUserLevel(username, channel = this.accountId)
	{
		return this.makeRequest(HTTP.DELETE, `bot/${channel}/levels/${username}`, { id: 'levels' });
	}

	/* bot commands */

	/**
	 * @param  String
	 * @return Promise
	 */
	getBotCommands(channel = this.accountId)
	{
		return this.makeRequest(HTTP.GET, `bot/commands/${channel}`);
	}

	/**
	 * @param  Object
	 * @param  String
	 * @return Promise
	 */
	createBotCommand(options, channel = this.accountId)
	{
		return this.makeRequest(HTTP.POST, `bot/commands/${channel}`, options);
	}

	/**
	 * @param  String
	 * @return Promise
	 */
	getDefaultBotCommands(channel = this.accountId)
	{
		return this.makeRequest(HTTP.GET, `bot/commands/${channel}/default`);
	}

	/**
	 * @param  String
	 * @param  Object
	 * @param  String
	 * @return Promise
	 */
	updateDefaultBotCommand(commandId, options, channel = this.accountId)
	{
		return this.makeRequest(HTTP.PUT, `bot/commands/${channel}/default/${commandId}`, options);
	}

	/**
	 * @param  String
	 * @param  String
	 * @return Promise
	 */
	getBotCommand(commandId, channel = this.accountId)
	{
		return this.makeRequest(HTTP.GET, `bot/commands/${channel}/${commandId}`);
	}

	/**
	 * @param  String
	 * @param  Object
	 * @param  String
	 * @return Promise
	 */
	updateBotCommand(commandId, options, channel = this.accountId)
	{
		return this.makeRequest(HTTP.PUT, `bot/commands/${channel}/${commandId}`, options);
	}

	/**
	 * @param  String
	 * @param  String
	 * @return Promise
	 */
	deleteBotCommand(command, channel = this.accountId)
	{
		return this.makeRequest(HTTP.DELETE, `bot/commands/${channel}/${commandId}`);
	}

	/* bot timers */

	/**
	 * @param  String
	 * @return Promise
	 */
	getBotTimers(channel = this.accountId)
	{
		return this.makeRequest(HTTP.GET, `bot/timers/${channel}`);
	}

	/**
	 * @param  Object
	 * @param  String
	 * @return Promise
	 */
	createBotTimer(options, channel = this.accountId)
	{
		return this.makeRequest(HTTP.POST, `bot/timers/${channel}`, options);
	}

	/**
	 * @param  String
	 * @param  String
	 * @return Promise
	 */
	getBotTimer(timerId, channel = this.accountId)
	{
		return this.makeRequest(HTTP.GET, `bot/timers/${channel}/${timerId}`);
	}

	/**
	 * @param  String
	 * @param  Object
	 * @param  String
	 * @return Promise
	 */
	updateBotTimer(timerId, options, channel = this.accountId)
	{
		return this.makeRequest(HTTP.PUT, `bot/timers/${channel}/${timerId}`, options);
	}

	/**
	 * @param  String
	 * @param  String
	 * @return Promise
	 */
	deleteBotTimer(timerId, channel = this.accountId)
	{
		return this.makeRequest(HTTP.DELETE, `bot/timers/${channel}/${timerId}`);
	}

	/* changelogs */

	/**
	 * @return Promise
	 */
	getLatestChangelog()
	{
		return this.makeRequest(HTTP.GET, `changelogs/latest`);
	}

	/**
	 * @return Promise
	 */
	getFirstChangelog()
	{
		return this.makeRequest(HTTP.GET, `changelogs/first`);
	}

	/* channels */

	/**
	 * @return Promise
	 */
	getCurrentChannel()
	{
		return this.makeRequest(HTTP.GET, `channels/me`);
	}

	/**
	 * @param  String
	 * @return Promise
	 */
	getChannel(channel = this.accountId)
	{
		return this.makeRequest(HTTP.GET, `channels/${channel}`);
	}

	/**
	 * @param  String
	 * @return Promise
	 */
	getChannelEmotes(channel = this.accountId)
	{
		return this.makeRequest(HTTP.GET, `channels/${channel}/emotes`);
	}

	/**
	 * @param  String
	 * @return Promise
	 */
	getChannelDetails(channel = this.accountId)
	{
		return this.makeRequest(HTTP.GET, `channels/${channel}/details`);
	}

	/**
	 * @param  Object
	 * @param  String
	 * @return Promise
	 */
	updateChannelProfile(options, channel = this.accountId)
	{
		return this.makeRequest(HTTP.PUT, `channels/${channel}/profile`, options);
	}

	/**
	 * @param  String
	 * @return Promise
	 */
	getChannelUsers(channel = this.accountId)
	{
		return this.makeRequest(HTTP.GET, `channels/${channel}/users`);
	}

	/**
	 * @param  String
	 * @param  String
	 * @param  String
	 * @return Promise
	 */
	updateUserAccessLevel(userId, role, channel = this.accountId)
	{
		return this.makeRequest(HTTP.PUT, `channels/${channel}/users/${userId}`, { role })
	}

	/**
	 * @param  String
	 * @param  String
	 * @return Promise
	 */
	deleteUserAccess(userId, channel = this.accountId)
	{
		return this.makeRequest(HTTP.DELETE, `channels/${channel}/users/${userId}`);
	}

	/**
	 * @param  String
	 * @return Promise
	 */
	roleplayAsUser(channel = this.accountId)
	{
		return this.makeRequest(HTTP.POST, `channels/${channel}/roleplay`);
	}

	/* contests */

	/**
	 * @param  String
	 * @return Promise
	 */
	getContests(channel = this.accountId)
	{
		return this.makeRequest(HTTP.GET, `contests/${channel}`);
	}

	/**
	 * @param  Object
	 * @param  String
	 * @return Promise
	 */
	createContest(options, channel = this.accountId)
	{
		return this.makeRequest(HTTP.POST, `contests/${channel}`, options);
	}

	/**
	 * @param  String
	 * @return Promise
	 */
	getCompletedContests(channel = this.accountId)
	{
		return this.makeRequest(HTTP.GET, `contests/${channel}/history`);
	}

	/**
	 * @param  String
	 * @param  String
	 * @return Promise
	 */
	getContest(contestId, channel = this.accountId)
	{
		return this.makeRequest(HTTP.GET, `contests/${channel}/${contestId}`);
	}

	/**
	 * @param  String
	 * @param  Object
	 * @param  String
	 * @return Promise
	 */
	updateContest(contestId, options, channel = this.accountId)
	{
		return this.makeRequest(HTTP.PUT, `contests/${channel}/${contestId}`, options);
	}

	/**
	 * @param  String
	 * @param  String
	 * @return Promise
	 */
	deleteContest(contestId, channel = this.accountId)
	{
		return this.makeRequest(HTTP.DELETE, `contests/${channel}/${contestId}`);
	}

	/**
	 * @param  String
	 * @param  String
	 * @param  String
	 * @param  String
	 * @return Promise
	 */
	createContestBet(contestId, optionId, amount, channel = this.accountId)
	{
		return this.makeRequest(HTTP.POST, `contests/${channel}/${contestId}/bet`, { optionId, amount });
	}

	/**
	 * @param  String
	 * @param  String
	 * @return Promise
	 */
	getContestBet(contestId, channel = this.accountId)
	{
		return this.makeRequest(HTTP.GET, `contests/${channel}/${contestId}/bet`);
	}

	/**
	 * @param  String
	 * @param  String
	 * @return Promise
	 */
	startContest(contestId, channel = this.accountId)
	{
		return this.makeRequest(HTTP.PUT, `contests/${channel}/${contestId}/start`);
	}

	/**
	 * @param  String
	 * @param  String
	 * @param  String
	 * @return Promise
	 */
	setContestWinner(contestId, winnerId, channel = this.accountId)
	{
		return this.makeRequest(HTTP.PUT, `contests/${channel}/${contestId}/winner`, { winnerId });
	}

	/**
	 * @param  String
	 * @param  String
	 * @return Promise
	 */
	refundContest(contestId, channel = this.accountId)
	{
		return this.makeRequest(HTTP.DELETE, `contests/${channel}/${contestId}/refund`);
	}

	/**
	 * @param  String
	 * @param  String
	 * @return Promise
	 */
	closeContest(contestId, channel = this.accountId)
	{
		return this.makeRequest(HTTP.DELETE, `contests/${channel}/${contestId}/stop`);
	}

	/* giveaways */

	/**
	 * @param  String
	 * @return Promise
	 */
	getGiveaways(channel = this.accountId)
	{
		return this.makeRequest(HTTP.GET, `giveaways/${channel}`);
	}

	/**
	 * @param  Object
	 * @param  String
	 * @return Promise
	 */
	createGiveaway(options, channel = this.accountId)
	{
		return this.makeRequest(HTTP.POST, `giveaways/${channel}`);
	}

	/**
	 * @param  String
	 * @return Promise
	 */
	getPastGiveaways(channel = this.accountId)
	{
		return this.makeRequest(HTTP.GET, `giveaways/${channel}/history`);
	}

	/**
	 * @param  String
	 * @param  String
	 * @return Promise
	 */
	getGiveaway(giveawayId, channel = this.accountId)
	{
		return this.makeRequest(HTTP.GET, `giveaways/${channel}/${giveawayId}`);
	}

	/**
	 * @param  String
	 * @param  String
	 * @param  String
	 * @return Promise
	 */
	buyGiveawayTickets(giveawayId, tickets, channel = this.accountId)
	{
		return this.makeRequest(HTTP.POST, `giveaways/${channel}/${giveawayId}`, { tickets });
	}

	/**
	 * @param  String
	 * @param  Object
	 * @param  String
	 * @return Promise
	 */
	updateGiveaway(giveawayId, options, channel = this.accountId)
	{
		return this.makeRequest(HTTP.PUT, `giveaways/${channel}/${giveawayId}`, options);
	}

	/**
	 * @param  String
	 * @param  String
	 * @return Promise
	 */
	deleteGiveaway(giveawayId, channel = this.accountId)
	{
		return this.makeRequest(HTTP.DELETE, `giveaways/${channel}/${giveawayId}`);
	}

	/**
	 * @param  String
	 * @param  String
	 * @return Promise
	 */
	getUserGiveawayStatus(giveawayId, channel = this.accountId)
	{
		return this.makeRequest(HTTP.GET, `giveaways/${channel}/${giveawayId}/joined`);
	}

	/**
	 * @param  String
	 * @param  String
	 * @return Promise
	 */
	completeGiveaway(giveawayId, channel = this.accountId)
	{
		return this.makeRequest(HTTP.PUT, `giveaways/${channel}/${giveawayId}/complete`);
	}

	/**
	 * @param  String
	 * @param  String
	 * @return Promise
	 */
	refundGiveaway(giveawayId, channel = this.accountId)
	{
		return this.makeRequest(HTTP.DELETE, `giveaways/${channel}/${giveawayId}/refund`);
	}

	/**
	 * @param  String
	 * @param  String
	 * @return Promise
	 */
	closeGiveaway(giveawayId, channel = this.accountId)
	{
		return this.makeRequest(HTTP.DELETE, `giveaways/${channel}/${giveawayId}/close`);
	}

	/* logs */

	/**
	 * @param  String
	 * @return Promise
	 */
	getLogs(channel = this.accountId)
	{
		return this.makeRequest(HTTP.GET, `logs/${channel}`);
	}

	/* loyalty */

	/**
	 * @param  String
	 * @return Promise
	 */
	getLoyaltySettings(channel = this.accountId)
	{
		return this.makeRequest(HTTP.GET, `loyalty/${channel}`);
	}

	/**
	 * @param  Object
	 * @param  String
	 * @return Promise
	 */
	updateLoyaltySettings(options, channel = this.accountId)
	{
		return this.makeRequest(HTTP.PUT, `loyalty/${channel}`, options);
	}

	/* overlays */

	/**
	 * @param  String
	 * @return Promise
	 */
	getOverlays(channel = this.accountId)
	{
		return this.makeRequest(HTTP.GET, `overlays/${channel}`);
	}

	/**
	 * @param  Object
	 * @param  String
	 * @return Promise
	 */
	createOverlay(options, channel = this.accountId)
	{
		return this.makeRequest(HTTP.POST, `overlays/${channel}`, options);
	}

	/**
	 * @param  String
	 * @param  String
	 * @return Promise
	 */
	getOverlay(overlayId, channel = this.accountId)
	{
		return this.makeRequest(HTTP.GET, `overlays/${channel}/${overlayId}`);
	}

	/**
	 * @param  String
	 * @param  Object
	 * @param  String
	 * @return Promise
	 */
	updateOverlay(overlayId, options, channel = this.accountId)
	{
		return this.makeRequest(HTTP.PUT, `overlays/${channel}/${overlayId}`, options);
	}

	/**
	 * @param  String
	 * @param  String
	 * @return Promise
	 */
	deleteOverlay(overlayId, channel = this.accountId)
	{
		return this.makeRequest(HTTP.DELETE, `overlays/${channel}/${overlayId}`);
	}

	/* points */

	/**
	 * @param  Object
	 * @param  String
	 * @return Promise
	 */
	updatePoints(options, channel = this.accountId)
	{
		return this.makeRequest(HTTP.PUT, `points/${channel}`, options);
	}

	/**
	 * @param  String
	 * @param  String
	 * @return Promise
	 */
	getUserPoints(userId, channel = this.accountId)
	{
		return this.makeRequest(HTTP.GET, `points/${channel}/${userId}`);
	}

	/**
	 * @param  String
	 * @param  String
	 * @return Promise
	 */
	deleteUserPoints(userId, channel = this.accountId)
	{
		return this.makeRequest(HTTP.DELETE, `points/${channel}/${userId}`);
	}

	/**
	 * @param  String
	 * @param  String
	 * @param  String
	 * @return Promise
	 */
	addUserPoints(userId, amount, channel = this.accountId)
	{
		return this.makeRequest(HTTP.PUT, `points/${channel}/${userId}/${Math.abs(amount)}`);
	}

	/**
	 * @param  String
	 * @param  String
	 * @param  String
	 * @return Promise
	 */
	removeUserPoints(userId, amount, channel = this.accountId)
	{
		return this.makeRequest(HTTP.PUT, `points/${channel}/${userId}/${-Math.abs(amount)}`);
	}

	/**
	 * @param  String
	 * @param  String
	 * @return Promise
	 */
	getUserRank(userId, channel = this.accountId)
	{
		return this.makeRequest(HTTP.GET, `points/${channel}/${userId}/rank`);
	}

	/**
	 * @param  String
	 * @return Promise
	 */
	resetPointsLeaderboard(channel = this.accountId)
	{
		return this.makeRequest(HTTP.DELETE, `points/${channel}/reset/current`);
	}

	/**
	 * @param  String
	 * @return Promise
	 */
	resetAlltimePointsLeaderboard(channel = this.accountId)
	{
		return this.makeRequest(HTTP.DELETE, `points/${channel}/reset/alltime`);
	}

	/**
	 * @param  String
	 * @param  String
	 * @param  String
	 * @return Promise
	 */
	getTopPointsUsersAlltime(limit, offset, channel = this.accountId)
	{
		return this.makeRequest(HTTP.GET, `points/${channel}/alltime`, {}, { limit, offset });
	}

	/**
	 * @param  String
	 * @param  String
	 * @param  String
	 * @return Promise
	 */
	getTopPointsUsers(limit, offset, channel = this.accountId)
	{
		return this.makeRequest(HTTP.GET, `points/${channel}/top`, {}, { limit, offset });
	}

	/* sessions */

	/**
	 * @param  String
	 * @return Promise
	 */
	getUserSessionData(channel = this.accountId)
	{
		return this.makeRequest(HTTP.GET, `sessions/${channel}`);
	}

	/**
	 * @param  Object
	 * @param  String
	 * @return Promise
	 */
	updateUserSessionData(options, channel = this.accountId)
	{
		return this.makeRequest(HTTP.PUT, `sessions/${channel}`, options);
	}

	/**
	 * @param  String
	 * @return Promise
	 */
	resetUserSessionData(channel = this.accountId)
	{
		return this.makeRequest(HTTP.PUT, `sessions/${channel}/reset`);
	}

	/**
	 * @param  String
	 * @return Promise
	 */
	reloadUserSessionData(channel = this.accountId)
	{
		return this.makeRequest(HTTP.PUT, `sessions/${channel}/reload`);
	}

	/* songrequest */

	/**
	 * @param  String
	 * @return Promise
	 */
	getSongRequestSettings(channel = this.accountId)
	{
		return this.makeRequest(HTTP.GET, `songrequest/${channel}/settings`);
	}

	/**
	 * @param  Object
	 * @param  String
	 * @return Promise
	 */
	updateSongRequestSettings(options, channel = this.accountId)
	{
		return this.makeRequest(HTTP.PUT, `songrequest/${channel}/settings`, options);
	}

	/**
	 * @param  String
	 * @return Promise
	 */
	getPublicSongRequestSettings(channel = this.accountId)
	{
		return this.makeRequest(HTTP.GET, `songrequest/${channel}/public`);
	}

	/**
	 * @param  String
	 * @return Promise
	 */
	getSongRequestQueue(channel = this.accountId)
	{
		return this.makeRequest(HTTP.GET, `songrequest/${channel}/queue`);
	}

	/**
	 * @param  String
	 * @param  String
	 * @return Promise
	 */
	createSongRequest(song, channel = this.accountId)
	{
		return this.makeRequest(HTTP.POST, `songrequest/${channel}/queue`, { song });
	}

	/**
	 * @param  String
	 * @return Promise
	 */
	getSongRequestHistory(channel = this.accountId)
	{
		return this.makeRequest(HTTP.GET, `songrequest/${channel}/queue/history`);
	}

	/**
	 * @param  String
	 * @return Promise
	 */
	skipCurrentSong(channel = this.accountId)
	{
		return this.makeRequest(HTTP.DELETE, `songrequest/${channel}/queue/skip`);
	}

	/**
	 * @param  String
	 * @param  String
	 * @return Promise
	 */
	deleteSongRequest(songId, channel = this.accountId)
	{
		return this.makeRequest(HTTP.DELETE, `songrequest/${channel}/queue/${songId}`);
	}

	/**
	 * @param  String
	 * @return Promise
	 */
	clearSongRequestQueue(channel = this.accountId)
	{
		return this.makeRequest(HTTP.DELETE, `songrequest/${channel}/clear`);
	}

	/**
	 * @param  String
	 * @return Promise
	 */
	getCurrentSong(channel = this.accountId)
	{
		return this.makeRequest(HTTP.GET, `songrequest/${channel}/playing`);
	}

	/**
	 * @param  String
	 * @param  String
	 * @return Promise
	 */
	setSongRequestVolume(volumeAmount, channel = this.accountId) {
		const volume = parseInt(volumeAmount, 10);

		if (isNaN(volume) ||
			volume < 0 ||
			volume > 100) {
			throw new Error('volumeAmount should be a number between 0 and 100.');
		}

		return this.makeRequest(HTTP.POST, `songrequest/${channel}/player/volume`, { volume });
	}

	/* speech */

	/**
	 * @param  String
	 * @param  String
	 * @return Promise
	 */
	generateSpeech(text, voice = 'Joanna')
	{
		return this.makeRequest(HTTP.GET, `speech`, {}, { text, voice });
	}

	/**
	 * @return Promise
	 */
	getSpeechVoices()
	{
		return this.makeRequest(HTTP.GET, `speech/voices`);
	}

	/* stats */

	/**
	 * @param  String
	 * @return Promise
	 */
	getDailyStats(channel = this.accountId)
	{
		return this.makeRequest(HTTP.GET, `stats/${channel}/daily`);
	}

	/**
	 * @param  String
	 * @return Promise
	 */
	getMonthlyStats(channel = this.accountId)
	{
		return this.makeRequest(HTTP.GET, `stats/${channel}/monthly`);
	}

	/* store */

	/**
	 * @param  String
	 * @return Promise
	 */
	getStoreItems(channel = this.accountId)
	{
		return this.makeRequest(HTTP.GET, `store/${channel}/items`);
	}

	/**
	 * @param  Object
	 * @param  String
	 * @return Promise
	 */
	createStoreItem(options, channel = this.accountId)
	{
		return this.makeRequest(HTTP.POST, `store/${channel}/items`, options);
	}

	/**
	 * @param  String
	 * @param  String
	 * @return Promise
	 */
	getStoreItem(itemId, channel = this.accountId)
	{
		return this.makeRequest(HTTP.GET, `store/${channel}/items/${itemId}`);
	}

	/**
	 * @param  String
	 * @param  Object
	 * @param  String
	 * @return Promise
	 */
	updateStoreItem(itemId, options, channel = this.accountId)
	{
		return this.makeRequest(HTTP.PUT, `store/${channel}/items/${itemId}`);
	}

	/**
	 * @param  String
	 * @param  String
	 * @return Promise
	 */
	deleteStoreItem(itemId, channel = this.accountId)
	{
		return this.makeRequest(HTTP.DELETE, `store/${channel}/items/${itemId}`);
	}

	/**
	 * @param  String
	 * @param  String
	 * @param  String
	 * @param  String
	 * @return Promise
	 */
	getStoreRedemptions(limit, offset, pending, channel = this.accountId)
	{
		return this.makeRequest(HTTP.GET, `store/${channel}/redemptions`, {}, { limit, offset, pending });
	}

	/**
	 * @param  String
	 * @param  String
	 * @return Promise
	 */
	getStoreRedemption(redemptionId, channel = this.accountId)
	{
		return this.makeRequest(HTTP.GET, `store/${channel}/redemptions/${redemptionId}`);
	}

	/**
	 * @param  String
	 * @param  Object
	 * @param  String
	 * @return Promise
	 */
	updateStoreRedemption(redemptionId, options, channel = this.accountId)
	{
		return this.makeRequest(HTTP.PUT, `store/${channel}/redemptions/${redemptionId}`, options);
	}

	/**
	 * @param  String
	 * @param  Object
	 * @param  String
	 * @return Promise
	 */
	deleteStoreRedemption(redemptionId, options, channel = this.accountId)
	{
		return this.makeRequest(HTTP.DELETE, `store/${channel}/redemptions/${redemptionId}`);
	}

	/**
	 * @param  String
	 * @param  String
	 * @return Promise
	 */
	createStoreRedemption(itemId, channel = this.accountId)
	{
		return this.makeRequest(HTTP.POST, `store/${channel}/redemptions/${itemId}`);
	}

	/* streams */

	/**
	 * @param  String
	 * @return Promise
	 */
	getStreams(channel = this.accountId)
	{
		return this.makeRequest(HTTP.GET, `streams/${channel}`);
	}

	/**
	 * @param  String
	 * @return Promise
	 */
	getStreamStatus(channel = this.accountId)
	{
		return this.makeRequest(HTTP.GET, `streams/${channel}/live`);
	}

	/**
	 * @param  String
	 * @param  String
	 * @return Promise
	 */
	getStreamDetails(streamId, channel = this.accountId)
	{
		return this.makeRequest(HTTP.GET, `streams/${channel}/${streamId}`);
	}

	/* themes */

	/**
	 * @return Promise
	 */
	getThemes()
	{
		return this.makeRequest(HTTP.GET, `themes`);
	}

	/**
	 * @param  String
	 * @return Promise
	 */
	getTheme(themeId)
	{
		return this.makeRequest(HTTP.GET, `themes/${themeId}`);
	}

	/**
	 * @param  String
	 * @param  Object
	 * @return Promise
	 */
	createOverlayFromTheme(themeId, options)
	{
		return this.makeRequest(HTTP.POST, `themes/${themeId}`, options);
	}

	/**
	 * @param  String
	 * @param  String
	 * @return Promise
	 */
	rateTheme(themeId, rating)
	{
		return this.makeRequest(HTTP.POST, `themes/${themeId}/rate`, { rating });
	}

	/**
	 * @param  String
	 * @param  String
	 * @return Promise
	 */
	getThemeRatingForChannel(themeId, channel = this.accountId)
	{
		return this.makeRequest(HTTP.GET, `themes/${themeId}/${channel}/rating`);
	}

	/* tipping */

	/**
	 * @return Promise
	 */
	getTippingExchangeRates()
	{
		return this.makeRequest(HTTP.GET, `tipping/rates`);
	}

	/**
	 * @param  String
	 * @return Promise
	 */
	getTippingSettings(channel = this.accountId)
	{
		return this.makeRequest(HTTP.GET, `tipping/${channel}`);
	}

	/**
	 * @param  Object
	 * @param  String
	 * @return Promise
	 */
	updateTippingSettings(options, channel = this.accountId)
	{
		return this.makeRequest(HTTP.PUT, `tipping/${channel}`, options);
	}

	/* tips */

	/**
	 * @param  String
	 * @return Promise
	 */
	getTips(channel = this.accountId)
	{
		return this.makeRequest(HTTP.GET, `tips/${channel}`);
	}

	/**
	 * @param  Object
	 * @param  String
	 * @return Promise
	 */
	createTip(options, channel = this.accountId)
	{
		return this.makeRequest(HTTP.POST, `tips/${channel}`, options);
	}

	/**
	 * @param  String
	 * @return Promise
	 */
	getTopTippers(channel = this.accountId)
	{
		return this.makeRequest(HTTP.GET, `tips/${channel}/top`);
	}

	/**
	 * @param  String
	 * @return Promise
	 */
	getTipLeaderboard(channel = this.accountId)
	{
		return this.makeRequest(HTTP.GET, `tips/${channel}/leaderboard`);
	}

	/**
	 * @param  String
	 * @return Promise
	 */
	getRecentTips(channel = this.accountId)
	{
		return this.makeRequest(HTTP.GET, `tips/${channel}/moderation`);
	}

	/**
	 * @param  String
	 * @return Promise
	 */
	getTip(tipId, channel = this.accountId)
	{
		return this.makeRequest(HTTP.GET, `tips/${channel}/${tipId}`);
	}

	/**
	 * @param  String
	 * @param  Object
	 * @param  String
	 * @return Promise
	 */
	updateTip(tipId, options, channel = this.accountId)
	{
		return this.makeRequest(HTTP.PUT, `tips/${channel}/${tipId}`, options);
	}

	/**
	 * @param  String
	 * @param  String
	 * @return Promise
	 */
	deleteTip(tipId, channel = this.accountId)
	{
		return this.makeRequest(HTTP.DELETE, `tips/${channel}/${tipId}`);
	}

	/* uploads */

	/**
	 * @param  String
	 * @return Promise
	 */
	getAssets(channel = this.accountId)
	{
		return this.makeRequest(HTTP.GET, `uploads/${channel}`);
	}

	/**
	 * @param  String
	 * @param  String
	 * @return Promise
	 */
	deleteAsset(assetId, channel = this.accountId)
	{
		return this.makeRequest(HTTP.DELETE, `uploads/${channel}/${assetId}`);
	}

	/* users */

	/**
	 * @return Promise
	 */
	getCurrentUser()
	{
		return this.makeRequest(HTTP.GET, `users/current`);
	}

	/**
	 * @return Promise
	 */
	getUserChannels()
	{
		return this.makeRequest(HTTP.GET, `users/channels`);
	}

	/**
	 * @return Promise
	 */
	getChannelAccess()
	{
		return this.makeRequest(HTTP.GET, `users/access`);
	}

}

module.exports = StreamElements;
