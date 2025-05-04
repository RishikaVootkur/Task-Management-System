import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { Server } from 'socket.io';

let io: Server | null = null;

export async function middleware(request: NextRequest) {
  if (!io) {
    const server = request.socket.server;
    if (!server) {
      return NextResponse.json({ error: 'Server not available' }, { status: 500 });
    }
    
    io = new Server(server, {
      path: '/api/socket',
      addTrailingSlash: false,
      cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
      }
    });

    io.on('connection', (socket) => {
      console.log('Client connected');
      
      socket.on('join', (userId) => {
        socket.join(userId);
        console.log(`User ${userId} joined`);
      });
      
      socket.on('taskCreated', (task) => {
        console.log('Task created:', task);
        io.to(task.assignedTo).emit('newTask', task);
      });
    });
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/api/socket/:path*',
};