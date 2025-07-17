import _ from 'lodash';
import * as React from 'react';

// Helper function to flatten fragments
export const flattenChildren = (
  children: React.ReactNode,
): React.ReactNode[] => {
  return React.Children.toArray(children).flatMap((child) =>
    React.isValidElement(child) && child.type === React.Fragment
      ? // @ts-expect-error - React.Fragment is not typed
        flattenChildren(child.props.children)
      : [child],
  );
};

// Helper function to clean empty parameters
export const cleanEmptyParams = <T extends Record<string, unknown>>(
  search: T,
): Partial<T> => _.omitBy(search, (value) => !value) as Partial<T>;
