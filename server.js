const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);

const formatMessage = (userName, text) => {
	return {
		userName,
		text,
	};
};

const botName = 'Game Bot';

const users = [];

const userJoin = (id, userName, room, roomLimit, gameDuration, game) => {
	users.push({ id, userName, room, roomLimit, gameDuration, game });
	return users.slice(-1)[0];
};

const getCurrentUser = id => users.find(user => user.id === id);

const userLeave = id => {
	const index = users.findIndex(user => user.id === id);
	if (index !== -1) return users.splice(index, 1)[0];
};
const getRoomUsers = room => users.filter(user => user.room === room);

const addRooms = arr =>
	arr.reduce(
		(acc, cur) => ({
			...acc,
			[cur['room']]: acc[cur['room']] ? [...acc[cur['room']], cur] : [cur],
		}),
		{}
	);

io.on('connection', socket => {
	socket.on('joinRoom', ({ roomId, userName, roomLimit, gameDuration, game }) => {
		if (getRoomUsers(roomId).length < roomLimit) {
			const user = userJoin(socket.id, userName, roomId, roomLimit, gameDuration, game);
			console.log(getRoomUsers(roomId).length, roomLimit, user.room);
			socket.join(user.room);
			io.to(user.room).emit('roomUsers', {
				room: user.room,
				users: getRoomUsers(user.room),
			});
			socket.on('userMsg', msg => {
				const user = getCurrentUser(socket.id);
				io.to(user.room).emit('message', formatMessage(user.userName, msg));
			});
		}
	});

	socket.emit('allRooms', addRooms(users));

	socket.on('disconnect', () => {
		const user = userLeave(socket.id);
		if (user) {
			io.to(user.room).emit(
				'message',
				formatMessage(botName, `${user.userName} has left the room`)
			);

			io.to(user.room).emit('roomUsers', {
				room: user.room,
				users: getRoomUsers(user.room),
			});
		}
	});
});

http.listen(4000, () => console.log(`Server on port 4000`));
