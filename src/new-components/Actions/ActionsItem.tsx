import * as React from 'react';
import cn from 'classnames';
import { ActionsItemProps } from './interface';

export const ActionsItem: React.FC<ActionsItemProps> = ({ children, ...props }) => {
  return (
    <div {...props} className={cn('ebs-actions__item', props.className)}>
      {children}
    </div>
  );
};
