export interface Director {
  id: number;
  name: string;
  nationality?: string;
  age?: number;
  active: boolean;
}

export interface CreateDirector {
  name: string;
  nationality?: string;
  age?: number;
  active: boolean;
}

export interface UpdateDirector {
  name?: string;
  nationality?: string;
  age?: number;
  active?: boolean;
} 