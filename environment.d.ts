declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PAGINATION_TAKE_DEFAULT?: string;
      PAGINATION_TAKE_MAX?: string;
      DATABASE_URL: string;
    }
  }
}

export {};
