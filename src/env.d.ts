declare namespace NodeJS {
  interface ProcessEnv {
    DATABASE_URL: string;
    OPENAI_API_KEY?: string;
    LLM_ADAPTER?: "openai" | "fake";
  }
}

export {};
