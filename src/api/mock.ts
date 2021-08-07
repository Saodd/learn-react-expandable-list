import { GetSomeCategoryResponse } from './category';


export const MockGet = {
  '/some/category': getSomeCategory,
};


function getSomeCategory(): GetSomeCategoryResponse {
  return {
    data: {
      cats: [
        { id: '0', parentId: '', title: '根目录' },
        { id: '1', parentId: '0', title: '目录1' },
        { id: '2', parentId: '0', title: '目录2' },
        { id: '3', parentId: '0', title: '目录3' },
        { id: '4', parentId: '1', title: '目录1.1' },
        { id: '5', parentId: '1', title: '目录1.2' },
        { id: '6', parentId: '4', title: '目录1.1.1' },
      ],
    },
  };
}
