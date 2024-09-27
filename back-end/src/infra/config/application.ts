export const application = {
  port: Number(process.env.PORT) || 3000,
  environment: process.env.NODE_ENV?.toLowerCase() || 'production',
};
