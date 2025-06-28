import { ConfigModule } from '@nestjs/config';

export default ConfigModule.forRoot({
  isGlobal: true,
  envFilePath: '.env',
  validationSchema: {
    DATABASE_URL: { required: true, type: 'string' },
    JWT_SECRET: { required: true, type: 'string' },
    GOOGLE_CLIENT_ID: { required: true, type: 'string' },
    GOOGLE_CLIENT_SECRET: { required: true, type: 'string' },
  },
});