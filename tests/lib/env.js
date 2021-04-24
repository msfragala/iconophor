export const ENV = process.env.NODE_ENV;
export const PROD = ENV === 'production';
export const PREVIEW = ENV === 'preview';
export const DEV = !ENV || ENV === 'development';

export const PROD_URL = 'https://www.iconophor.com';
export const PREVIEW_URL = process.env.PREVIEW_URL;
export const DEV_URL = 'http://localhost:3000';

export const CURRENT_URL = PROD ? PROD_URL : PREVIEW ? PREVIEW_URL : DEV_URL;
