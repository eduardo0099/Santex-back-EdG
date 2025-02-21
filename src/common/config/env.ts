import * as dotenv from 'dotenv';

dotenv.config();

export const ENV = {
  PORT: process.env.PORT || 4000,
  NODE_ENV: process.env.NODE_ENV || 'development',

  FOOTBALL_API_URL:
    process.env.FOOTBALL_API_URL || 'https://api.football-data.org/v4',
  FOOTBALL_API_TOKEN: process.env.FOOTBALL_API_TOKEN,
  FOOTBALL_REQ_PER_MIN: process.env.FOOTBALL_REQ_PER_MIN || 10,
};
