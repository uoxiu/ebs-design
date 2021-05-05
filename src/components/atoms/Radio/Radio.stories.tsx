import * as React from 'react';

import { Radio } from './Radio';
// import { Radio as InternalRadio } from './InternalRadio';
import { Form, useForm } from '../../organisms/Form';
import { exportStory } from '../../../libs';
import InternalRadio from './index';

export default {
  title: exportStory('Radio', 'atoms'),
  component: Radio,
};

const options = [
  { text: 'Simple Radio', value: 1 },
  { text: 'Simple Radio 2', value: 2 },
];

export const InternalRegular = (): React.ReactElement => {
  const [checked, setChecked] = React.useState('');

  const handleChange = (...a: any) => {
    console.log(`a`, a);
  };

  return (
    <div className="storybook-rows">
      <div className="storybook-row">
        <div className="storybook-header">Radio</div>

        <div className="storybook-row-item inline">
          <div className="storybook-label">Switcher</div>
          <InternalRadio.Group>
            <InternalRadio value={1} onChange={handleChange}>
              Sample value 1
            </InternalRadio>
            <InternalRadio value={2}>Sample value 2</InternalRadio>
            <InternalRadio value={3}>Sample value 3</InternalRadio>
          </InternalRadio.Group>
        </div>
      </div>
    </div>
  );
};

export const WithForm = (): React.ReactNode => {
  const [form] = useForm();

  return (
    <Form
      form={form}
      type="horizontal"
      labelOptions={{ col: { size: 2 } }}
      controlOptions={{ col: { size: 6 } }}
      onFinish={console.log}
    >
      <Form.Field name="firstName" label="First Name" rules={[{ required: true }]}>
        <Radio options={options} />
      </Form.Field>

      <button type="submit">Submit</button>
    </Form>
  );
};

export const Regular = (): React.ReactElement => {
  const [checked, setChecked] = React.useState();

  return (
    <div className="storybook-rows">
      <div className="storybook-row">
        <div className="storybook-header">Radio</div>

        <div className="storybook-row-item inline">
          <div className="storybook-label">Switcher</div>
          <Radio options={options} value={checked} onChange={setChecked} />
        </div>

        <div className="storybook-row-item inline">
          <div className="storybook-label">Inactive</div>
          <Radio options={options} value={2} />
        </div>

        <div className="storybook-row-item inline">
          <div className="storybook-label">Active</div>
          <Radio options={options} value={1} />
        </div>

        <div className="storybook-row-item inline">
          <div className="storybook-label">Disabled & Inactive</div>
          <Radio options={[{ ...options[0], disabled: true }]} value={2} />
        </div>

        <div className="storybook-row-item inline">
          <div className="storybook-label">Disabled & Active</div>
          <Radio options={[{ ...options[0], disabled: true }]} value={1} />
        </div>
      </div>

      <div className="storybook-row">
        <div className="storybook-header">Radio & Align right</div>

        <div className="storybook-row-item inline">
          <div className="storybook-label">Switcher</div>
          <Radio radioAlign="right" options={options} value={checked} onChange={setChecked} />
        </div>

        <div className="storybook-row-item inline">
          <div className="storybook-label">Inactive</div>
          <Radio radioAlign="right" options={options} value={2} />
        </div>

        <div className="storybook-row-item inline">
          <div className="storybook-label">Active</div>
          <Radio radioAlign="right" options={options} value={1} />
        </div>

        <div className="storybook-row-item inline">
          <div className="storybook-label">Disabled & Inactive</div>
          <Radio radioAlign="right" options={[{ ...options[0], disabled: true }]} value={2} />
        </div>

        <div className="storybook-row-item inline">
          <div className="storybook-label">Disabled & Active</div>
          <Radio radioAlign="right" options={[{ ...options[0], disabled: true }]} value={1} />
        </div>
      </div>
    </div>
  );
};
