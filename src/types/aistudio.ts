export interface AIStudioModel {
  id: string;
  name: string;
  tag: string;
  badge?: string;
  description: string;
  contextWindow: number;
  maxOutput: number;
  tokensPerSec: number;
}

export interface ToolCallExecution {
  name: string;
  args: Record<string, any>;
  result: string;
  status: 'success' | 'running' | 'error';
}

export interface TurnCodeBlock {
  language: string;
  code: string;
  filename?: string;
}

export interface AIStudioTurn {
  id: string;
  role: 'user' | 'model';
  content: string;
  timestamp: string;
  thought?: string;
  thoughtSeconds?: number;
  toolCalls?: ToolCallExecution[];
  codeBlocks?: TurnCodeBlock[];
  tokens?: number;
  modelUsed?: string;
}

export type SafetyThreshold = 'BLOCK_NONE' | 'BLOCK_ONLY_HIGH' | 'BLOCK_MEDIUM_AND_ABOVE' | 'BLOCK_LOW_AND_ABOVE';

export interface AIStudioParams {
  modelId: string;
  temperature: number;
  topP: number;
  topK: number;
  maxOutputTokens: number;
  systemInstruction: string;
  safetyHarassment: SafetyThreshold;
  safetyHateSpeech: SafetyThreshold;
  safetySexuallyExplicit: SafetyThreshold;
  safetyDangerousContent: SafetyThreshold;
  groundingSearch: boolean;
  codeExecution: boolean;
  structuredOutput: boolean;
  responseSchema: string;
  stopSequences: string[];
}

export type AIStudioViewMode = 'chat' | 'freeform' | 'cockpit' | 'code' | 'executive';

export interface SavedPrompt {
  id: string;
  title: string;
  updatedAt: string;
  type: 'chat' | 'freeform' | 'structured';
  tokenCount: number;
}
