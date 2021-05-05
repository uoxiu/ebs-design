import * as React from 'react';
import cn from 'classnames';
import { useMergedState } from 'hooks';
import { RadioChangeEvent } from './interface';
import { RadioGroupContext } from './context';

export interface RadioGroupProps {
  id?: string;
  className?: string;
  style?: React.CSSProperties;
  disabled?: boolean;
  name?: string; // 	The name property of all input[type="radio"] children
  defaultValue?: any;
  value?: any;
  onChange?: (e: any) => void;
}

const RadioGroup = React.forwardRef<HTMLDivElement, RadioGroupProps>(
  ({ id, className, style, children, ...props }, ref) => {
    const [value, setValue] = useMergedState(props.defaultValue, {
      value: props.value,
    });

    const handleChange = (ev: RadioChangeEvent): void => {
      const lastValue = value;
      const val = ev.target.value;

      if (!props.value) {
        setValue(val);
      }

      if (props.onChange && val !== lastValue) {
        props.onChange(ev);
      }
    };

    return (
      <RadioGroupContext.Provider
        value={{
          onChange: handleChange,
          value,
          disabled: props.disabled,
          name: props.name,
        }}
      >
        <div id={id} ref={ref} className={cn('ebs-radio__group', className)} style={style}>
          {children}
        </div>
      </RadioGroupContext.Provider>
    );
  },
);

export default React.memo(RadioGroup);
