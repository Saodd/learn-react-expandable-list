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
  depth?: number;
  isLast?: boolean;
}

export function ExpandableList<T>(props: ExpandableListProps<T>) {
  const { root, render, selectedId, setSelectedId, depth = 0, isLast } = props;
  const [expand, setExpand] = React.useState<boolean>(!!root.defaultExpand);
  const handleExpand = React.useCallback(() => {
    setExpand(!expand);
  }, [expand]);
  const handleClick = React.useCallback(() => {
    setSelectedId(root.id);
  }, [root]);

  const switchStyles = React.useMemo<string>(() => {
    if (!root.children.length) return classNames(styles.prefix, styles.switch, styles.switch0);
    if (expand) return classNames(styles.prefix, styles.switch, styles.switch2);
    return classNames(styles.prefix, styles.switch, styles.switch1);
  }, [root, expand]);
  const branchStyles = React.useMemo<string>(() => {
    if (depth === 0) return classNames(styles.prefix, styles.branch, styles.branch0);
    if (isLast) return classNames(styles.prefix, styles.branch, styles.branch2);
    return classNames(styles.prefix, styles.branch, styles.branch1);
  }, [depth]);
  const branchLines = React.useMemo<number[]>(
    () => new Array(Math.max(depth - 1, 0)).fill(0).map((n, i) => i + 1),
    [depth],
  );

  return (
    <div className={styles.root}>
      <div className={switchStyles} onClick={handleExpand} />
      <div className={branchStyles} />
      {branchLines.map((n) => (
        <div className={classNames(styles.prefix, styles.branch, styles.branch3)} style={{ left: -n * 24 + 'px' }} />
      ))}
      <div onClick={handleClick} className={classNames(styles.parent, selectedId === root.id && styles.selected)}>
        {render ? render(root) : <span>{root.id}</span>}
      </div>
      {expand && (
        <div className={styles.children}>
          {root.children.map((node, index) => (
            <ExpandableList
              root={node}
              render={render}
              selectedId={selectedId}
              setSelectedId={setSelectedId}
              depth={depth + 1}
              key={node.id}
              isLast={index === root.children.length - 1}
            />
          ))}
        </div>
      )}
    </div>
  );
}
