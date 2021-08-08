import * as request from './request';

export interface SomeCategory {
  id: string;
  parentId: string;
  title: string;
}

export type GetSomeCategoryRequest = Record<string, never>;

export interface GetSomeCategoryResponse {
  data: {
    cats: SomeCategory[];
  };
}

export async function getSomeCategory(params: GetSomeCategoryRequest): Promise<GetSomeCategoryResponse> {
  return request.get('/some/category', { params });
}
