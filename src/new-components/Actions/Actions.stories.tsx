import * as React from 'react';
import { Button } from 'components/Button/Button';
import { default as Actions } from './Actions';
import { exportStory } from '../../libs';

const { Item } = Actions;

export default {
  title: exportStory('Actions'),
  component: Actions,
  subcomponents: { Item },
};

export const regular = (): React.ReactNode => (
  <div>
    <Actions placement="bottom" title="Actions">
      <Item onClick={console.log}>Example</Item>
      <Item onClick={console.log}>Example</Item>
      <Item onClick={console.log}>Example</Item>
      <Item onClick={console.log}>Example</Item>
    </Actions>
  </div>
);

export const customTrigger = (): React.ReactNode => (
  <div>
    <Actions placement="top" title="Actions 2" customTrigger={<Button>Click me!</Button>}>
      <Item onClick={console.log}>Example</Item>
      <Item onClick={console.log}>Example</Item>
      <Item onClick={console.log}>Example</Item>
      <Item onClick={console.log}>Example</Item>
    </Actions>
  </div>
);
