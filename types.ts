
export interface MarketingPlan {
  productName: string;
  postCaption: string;
  hashtags: string[];
  postingTimeSuggestion: string;
  strategyAdvice: string;
  videoScript: string;
  sources?: string[];
}

export type WorkStatus = 'DRAFT' | 'PENDING_APPROVAL' | 'APPROVED' | 'POSTED';

export interface HistoryItem {
  id: string;
  timestamp: number;
  productName: string;
  productLink: string;
  plan: MarketingPlan;
  imageUrl?: string;
  status: WorkStatus;
}

export enum LoadingState {
  IDLE = 'IDLE',
  ANALYZING = 'ANALYZING',
  COMPLETE = 'COMPLETE',
  ERROR = 'ERROR'
}
