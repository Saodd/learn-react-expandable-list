import * as React from 'react';
import { getSomeCategory, SomeCategory } from '../api/category';

export function App() {
  return <div>
    <MyList />
  </div>;
}


function MyList() {
  const [cats, setCats] = React.useState<SomeCategory[]>([]);
  React.useEffect(() => {
    getSomeCategory({}).then(body => setCats(body.data.cats));
  }, []);

  return <div>
    {cats.map(cat => <p>{cat.title}</p>)}
  </div>;
}
