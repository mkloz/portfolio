interface Config {
  environment: string;
  isProduction: boolean;
  isDevelopment: boolean;
}
export const config: Config = {
  environment: import.meta.env.MODE,
  isProduction: import.meta.env.PROD,
  isDevelopment: import.meta.env.DEV
};
