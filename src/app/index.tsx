import * as React from 'react';
import { getSomeCategory, SomeCategory } from '../api/category';
import { ExpandableList, ExpandableListNode } from './ExpandableList';

export function App(): JSX.Element {
  return (
    <div>
      <MyList />
    </div>
  );
}

function MyList(): JSX.Element {
  const [cats, setCats] = React.useState<SomeCategory[]>([]);
  React.useEffect(() => {
    getSomeCategory({}).then((body) => setCats(body.data.cats));
  }, []);
  const root = React.useMemo<ExpandableListNode<SomeCategory>>(() => {
    // 1. 先把列表转化为Map，把所有元素注册进去
    const map = new Map<string, ExpandableListNode<SomeCategory>>();
    cats.forEach((cat) => map.set(cat.id, { id: cat.id, children: [], data: cat }));
    // 2. 兜底处理一下根节点，应对列表为空的情况
    map.set('0', map.get('0') || { id: '0', children: [], data: { id: '0', parentId: '', title: '根目录' } });
    // 3. 逐个添加到父节点的children中去
    cats.forEach((cat) => map.get(cat.parentId)?.children.push(map.get(cat.id)));
    // 4. 根节点默认展开
    map.get('0').defaultExpand = true;
    return map.get('0');
  }, [cats]);
  const render = React.useCallback((root: ExpandableListNode<SomeCategory>) => {
    return <span>{root.data.title}</span>;
  }, []);
  const [selectedId, setSelectedId] = React.useState('0');

  return (
    <div>
      <ExpandableList root={root} render={render} selectedId={selectedId} setSelectedId={setSelectedId} />
    </div>
  );
}
