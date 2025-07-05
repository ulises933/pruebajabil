import { Director } from './director.model';

export interface Movie {
  id: number;
  name: string;
  releaseYear?: string;
  gender?: string;
  duration?: string;
  fkDirector?: number;
  director?: Director;
}

export interface CreateMovie {
  name: string;
  releaseYear?: string;
  gender?: string;
  duration?: string;
  fkDirector?: number;
}

export interface UpdateMovie {
  name?: string;
  releaseYear?: string;
  gender?: string;
  duration?: string;
  fkDirector?: number;
} 