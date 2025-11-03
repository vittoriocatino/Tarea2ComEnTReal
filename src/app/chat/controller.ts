import { Request, Response } from 'express';

// Hardcoded rooms configuration
export const rooms = [
    { id: 'general', name: 'General', description: 'Conversación general para todos', icon: '💬' },
    { id: 'tecnologia', name: 'Tecnología', description: 'Habla sobre tecnología y programación', icon: '💻' },
    { id: 'deportes', name: 'Deportes', description: 'Discute sobre deportes y eventos', icon: '⚽' },
    { id: 'musica', name: 'Música', description: 'Comparte y habla sobre música', icon: '🎵' },
    { id: 'random', name: 'Random', description: 'Conversaciones aleatorias y divertidas', icon: '🎲' }
];

export function showLogin(req: Request, res: Response) {
    res.render('login', { layout: 'main' });
}

export function showRooms(req: Request, res: Response) {
    res.render('rooms', { layout: 'main', rooms });
}

export function showChat(req: Request, res: Response) {
    const { roomId } = req.params;
    const room = rooms.find(r => r.id === roomId);
    
    if (!room) {
        return res.redirect('/rooms');
    }
    
    res.render('chat', { layout: 'main', room });
}
