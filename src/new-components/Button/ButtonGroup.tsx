import * as React from 'react';
import cn from 'classnames';
import { ButtonGroupProps } from './interface';

export const ButtonGroup: React.FC<ButtonGroupProps> = ({ children, className }) => (
  <div className={cn(`ebs-btn__group`, className)}>{children}</div>
);
