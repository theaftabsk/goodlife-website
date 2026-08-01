module = {
  exports: {
    port: process.env.PORT || 5000,
    nodeEnv: process.env.NODE_ENV || 'development',
    jwtSecret: process.env.JWT_SECRET || 'goodlife-jwt-secret-min-32-chars',
    jwtRefreshSecret: process.env.JWT_REFRESH_SECRET || 'goodlife-refresh-secret',
    corsOrigins: (process.env.CORS_ORIGIN || 'http://localhost:3000,http://localhost:3001').split(','),
  }
};
