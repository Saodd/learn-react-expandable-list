import * as React from 'react';
import { ReactNode } from 'react';
import styles from './index.scss';
import classNames from 'classnames';

export type ExpandableListNode<T> = {
  id: string;
  children: ExpandableListNode<T>[];
  data: T;
  defaultExpand?: boolean;
};

interface ExpandableListProps<T> {
  root: ExpandableListNode<T>;
  render?: (root: ExpandableListNode<T>) => ReactNode;
  selectedId: string;
  setSelectedId: (v: string) => void;
}

export function ExpandableList<T>(props: ExpandableListProps<T>) {
  const { root, render, selectedId, setSelectedId } = props;
  const [expand, setExpand] = React.useState<boolean>(!!root.defaultExpand);
  const handleExpand = React.useCallback(() => {
    setExpand(!expand);
  }, [expand]);
  const handleClick = React.useCallback(() => {
    setSelectedId(root.id);
  }, [root]);

  return (
    <div className={styles.root}>
      <div onClick={handleClick} className={classNames(styles.parent, selectedId === root.id && styles.selected)}>
        {render ? render(root) : <span>{root.id}</span>}
      </div>
      <div
        className={classNames(styles.children, expand || styles.hide)}
        style={{ height: (expand ? 24 * root.children.length : 0) + 'px' }}
      >
        {root.children.map((node) => (
          <ExpandableList root={node} render={render} selectedId={selectedId} setSelectedId={setSelectedId} />
        ))}
      </div>
    </div>
  );
}
