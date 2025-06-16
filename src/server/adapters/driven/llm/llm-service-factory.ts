import type { LlmService } from "../../../domain/ports/llm-service";
import { FakeLlmAdapter } from "./fake-llm-adapter";
import { OpenAiAdapter } from "./open-ai-adapter";

export function createLlmService(): LlmService {
  if (process.env.LLM_ADAPTER === "openai") {
    return new OpenAiAdapter();
  }
  return new FakeLlmAdapter();
}
