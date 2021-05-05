import * as React from 'react';
import InternalRadio, { RadioProps } from './InternalRadio';
import Group from './RadioGroup';

interface CompoundedComponent extends React.ForwardRefExoticComponent<RadioProps & React.RefAttributes<HTMLElement>> {
  Group: typeof Group;
}

const Radio = InternalRadio as CompoundedComponent;

Radio.Group = Group;

export { Group };

export default Radio;
