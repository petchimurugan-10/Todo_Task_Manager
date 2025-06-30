import { Module } from '@nestjs/common';
import { Server } from 'socket.io';

@Module({
  providers: [
    {
      provide: 'SOCKET_IO_SERVER',
      useValue: new Server(),
    },
  ],
  exports: ['SOCKET_IO_SERVER'],
})
export class SharedModule {}