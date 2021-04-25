import * as React from 'react';
import { Icon } from 'components';
import { useLayoutState } from 'components/Layout/context';

import Item from '../Item';

export const TopMenu: React.FC<{ showToggle?: boolean }> = ({ showToggle = true, children }) => {
  const { onSetToggled } = useLayoutState();

  return (
    <div className="ebs-sidebar__top">
      {showToggle && onSetToggled !== undefined && (
        <Item
          className="ebs-sidebar__toggler"
          invert
          prefix={<Icon type="menu-fold" />}
          text="Hide titles"
          onClick={onSetToggled}
        />
      )}

      {children}
    </div>
  );
};
