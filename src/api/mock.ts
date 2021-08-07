import { GetSomeCategoryResponse } from './category';


export const MockGet = {
  '/some/category': getSomeCategory,
};


function getSomeCategory(): GetSomeCategoryResponse {
  return {
    data: {
      cats: [
        { id: '0', parentId: '', title: '根目录' },
        { id: '1', parentId: '', title: '目录1' },
        { id: '2', parentId: '', title: '目录2' },
        { id: '3', parentId: '', title: '目录3' },
        { id: '4', parentId: '', title: '目录1.1' },
        { id: '5', parentId: '', title: '目录1.2' },
        { id: '6', parentId: '', title: '目录1.1.1' },
      ],
    },
  };
}
