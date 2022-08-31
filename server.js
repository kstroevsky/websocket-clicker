const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);

const formatMesage = (userName, text) => {
	return {
		userName,
		text,
	};
};

const botName = 'Game Bot';

const users = [];


const userJoin = (id, userName, room, roomLimit) => {
	const user = {
		id,
		userName,
		room,
		roomLimit,
	};
	users.push(user);
	return user;
};
const getCurrentUser = id => users.find(user => user.id === id);

const userLeave = id => {
	const index = users.findIndex(user => user.id === id);
	if (index !== -1) {
		return users.splice(index, 1)[0];
	}
};
const getRoomUsers = room => users.filter(user => user.room === room);

const addRooms = arr => {
	return arr.reduce((acc, cur) => {
		if (!acc[cur['room']]) {
			return {
				...acc,
				[cur['room']]: [cur],
			};
		}
		return {
			...acc,
			[cur['room']]: [...acc[cur['room']], cur],
		};
	}, {});
};

io.on('connection', socket => {
	socket.on('joinRoom', ({ roomId, userName, roomLimit }) => {
		console.log(getRoomUsers(roomId).length < roomLimit, 'test');
		if (getRoomUsers(roomId).length < roomLimit) {
			const user = userJoin(socket.id, userName, roomId, roomLimit);
			console.log(getRoomUsers(roomId).length, roomLimit, user.room);
			socket.join(user.room);
			io.to(user.room).emit('roomUsers', {
				room: user.room,
				users: getRoomUsers(user.room),
			});
			socket.on('userMsg', msg => {
				const user = getCurrentUser(socket.id);
				io.to(user.room).emit('message', formatMesage(user.userName, msg));
			});
		} else {
			return null;
		}
	});
	socket.emit('allRooms', addRooms(users));

	socket.on('disconnect', () => {
		const user = userLeave(socket.id);
		if (user) {
			io.to(user.room).emit(
				'message',
				formatMesage(botName, `${user.userName} has left the room`)
			);

			io.to(user.room).emit('roomUsers', {
				room: user.room,
				users: getRoomUsers(user.room),
			});
		}
	});
});

http.listen(4000, () => console.log(`Server on port 4000`));
