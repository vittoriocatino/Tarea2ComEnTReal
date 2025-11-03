import express, {static as static_} from 'express';
import path from 'path';
import dotenv from 'dotenv';
dotenv.config()

import { engine } from 'express-handlebars';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import SwaggerOptions from '../swagger.config';
import { Server as SocketServer } from 'socket.io';
import { Server } from 'http';

import routes from './app/routes';

const PORT = process.env.PORT || 3000;

const app = express();

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './src/views');

app.use('/static', static_(path.join(__dirname, '..', 'public')))

app.use(routes)

const swaggerDocs = swaggerJSDoc(SwaggerOptions);
app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

const server: Server = app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

const io = new SocketServer(server, {
    cors: {
        origin: "*",
    }
});

// Store users in each room
interface RoomUser {
    socketId: string;
    username: string;
}

const roomUsers: Map<string, RoomUser[]> = new Map();

io.on('connection', (socket) => {
    console.log('Nueva conexión establecida:', socket.id);

    // Handle user joining a room
    socket.on('join-room', ({ roomId, username }: { roomId: string; username: string }) => {
        socket.join(roomId);
        
        // Add user to room users list
        if (!roomUsers.has(roomId)) {
            roomUsers.set(roomId, []);
        }
        const users = roomUsers.get(roomId)!;
        users.push({ socketId: socket.id, username });
        
        console.log(`${username} se unió a la sala ${roomId}`);
        
        // Notify all users in the room that a new user joined
        io.to(roomId).emit('user-joined', {
            username,
            timestamp: new Date(),
            userCount: users.length
        });
        
        // Send updated user list to all users in the room
        io.to(roomId).emit('room-users', users.map(u => u.username));
    });

    // Handle sending messages
    socket.on('send-message', ({ roomId, username, message }: { roomId: string; username: string; message: string }) => {
        const messageData = {
            username,
            message,
            timestamp: new Date(),
            socketId: socket.id
        };
        
        console.log(`Mensaje de ${username} en ${roomId}: ${message}`);
        
        // Broadcast message to all users in the room
        io.to(roomId).emit('new-message', messageData);
    });

    // Handle user leaving a room
    socket.on('leave-room', ({ roomId, username }: { roomId: string; username: string }) => {
        socket.leave(roomId);
        
        // Remove user from room users list
        if (roomUsers.has(roomId)) {
            const users = roomUsers.get(roomId)!;
            const index = users.findIndex(u => u.socketId === socket.id);
            if (index !== -1) {
                users.splice(index, 1);
            }
            
            console.log(`${username} salió de la sala ${roomId}`);
            
            // Notify remaining users
            io.to(roomId).emit('user-left', {
                username,
                timestamp: new Date(),
                userCount: users.length
            });
            
            // Send updated user list
            io.to(roomId).emit('room-users', users.map(u => u.username));
            
            // Clean up empty rooms
            if (users.length === 0) {
                roomUsers.delete(roomId);
            }
        }
    });

    // Handle disconnection
    socket.on('disconnect', () => {
        console.log('Usuario desconectado:', socket.id);
        
        // Find and remove user from all rooms
        roomUsers.forEach((users, roomId) => {
            const userIndex = users.findIndex(u => u.socketId === socket.id);
            if (userIndex !== -1) {
                const username = users[userIndex].username;
                users.splice(userIndex, 1);
                
                // Notify room
                io.to(roomId).emit('user-left', {
                    username,
                    timestamp: new Date(),
                    userCount: users.length
                });
                
                // Send updated user list
                io.to(roomId).emit('room-users', users.map(u => u.username));
                
                // Clean up empty rooms
                if (users.length === 0) {
                    roomUsers.delete(roomId);
                }
            }
        });
    });
});
