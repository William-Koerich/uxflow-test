export const jwtConfig = {
    secret: process.env.JWT_SECRET || 'your_secret_key',
    expiresIn: '1h', // Tempo de expiração do token
};
