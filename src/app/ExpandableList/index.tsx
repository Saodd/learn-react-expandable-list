import * as React from 'react';
import { ReactNode } from 'react';

export type ExpandableListNode<T> = {
  children: ExpandableListNode<T>[]
  data: T,
  defaultExpand?: boolean,
}


interface ExpandableListProps<T> {
  root: ExpandableListNode<T>;
  render?: (root: ExpandableListNode<T>) => ReactNode;
}

export function ExpandableList<T>(props: ExpandableListProps<T>) {
  const { root, render } = props;
  const [expand, setExpand] = React.useState<boolean>(!!root.defaultExpand);
  const handleClick = React.useCallback(() => {
    setExpand(!expand);
  }, [expand]);

  return <div>
    <div onClick={handleClick}>
      {render ? render(root) : <p>{root.data}</p>}
    </div>
    {expand && <div>
      {root.children.map(node => <ExpandableList root={node} render={render} />)}
    </div>
    }
  </div>;
}
