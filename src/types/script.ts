export interface Category {
  id: number;
  name: string;
}

export interface Script {
  id: number;
  name: string;
  description: string;
  content: string;
  author: string;
  category_id: number;
  category_name: string;
  created_at: string;
  updated_at: string;
}

export interface CreateScriptRequest {
  name: string;
  description: string;
  content: string;
  author: string;
  category_id: number; // 1=Digio, 2=Uber, 3=Templates
}

export interface UpdateScriptRequest {
  name: string;
  description: string;
  content: string;
  author: string;
  category_id: number;
}
