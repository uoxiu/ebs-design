import * as React from 'react';
import cn from 'classnames';
import { Tooltip, Icon } from 'components';
import { TooltipProps } from 'components/Tooltip';
import { ActionsItem } from './ActionsItem';
import { ActionsItemProps } from './interface';

export interface ActionsProps extends TooltipProps {
  // Custom trigger Component
  customTrigger?: React.ReactNode;
}

export interface ActionsComposition {
  Item: React.FC<ActionsItemProps>;
}

const Actions: React.FC<ActionsProps> & ActionsComposition = ({ children, customTrigger, ...props }) => {
  const renderTrigger = React.useMemo(() => customTrigger || <Icon type="dots" className="ebs-actions__icon" />, [
    customTrigger,
  ]);

  return (
    <Tooltip
      trigger="click"
      interactive={true}
      {...props}
      overlayClassName={cn('ebs-actions__overlay', props.overlayClassName)}
      content={<div className="ebs-actions__items">{children}</div>}
    >
      {renderTrigger}
    </Tooltip>
  );
};

Actions.displayName = 'Actions';

Actions.Item = ActionsItem;

export default Actions;
