import {connect} from '@planetscale/database';
import {drizzle} from 'drizzle-orm/planetscale-serverless';

const connection = connect({
  host: process.env.DATABASE_HOST,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
});

// eslint-disable-next-line import/prefer-default-export
export const db = drizzle(connection);
