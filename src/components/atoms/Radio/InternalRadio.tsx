import * as React from 'react';
import cn from 'classnames';
import { makeid } from 'libs/string';
import { composeRef } from 'libs';
import { RadioChangeEvent } from './interface';
import { RadioGroupContext, RadioGroupContextProps } from './context';

export type RadioAlign = 'left' | 'right';

export interface Option {
  text: React.ReactNode;
  value: string | number;
  disabled?: boolean;
}

export interface RadioProps extends Partial<HTMLInputElement> {
  className?: string;
  disabled?: boolean;
  value?: any;
  defaultChecked?: boolean;
  checked?: boolean;
  onChange?: (e: RadioChangeEvent) => void;
  tabIndex?: number;
  name?: string;
  id?: string;
  autoFocus?: boolean;
  type?: string;
  skipGroup?: boolean;
}

// interface RadioComposition extends React.ForwardRefExoticComponent<RadioProps & React.RefAttributes<HTMLElement>> {
//   Group: React.FC<RadioGroupProps>;
// }

const InternalRadio: React.ForwardRefRenderFunction<HTMLInputElement, RadioProps> = (
  { className, children, style, onChange, ...props },
  ref,
) => {
  const context = React.useContext(RadioGroupContext);
  const innerRef = React.useRef<HTMLInputElement>();
  const mergedRef = composeRef(ref, innerRef);

  const handleChange = (e: RadioChangeEvent): void => {
    console.log('e :>> ', e);
    onChange?.(e);
    context?.onChange?.(e);
  };

  const radioProps: RadioProps = { ...props };

  if (context) {
    radioProps.name = context.name;
    radioProps.onChange = handleChange;
    radioProps.checked = props.value === context.value;
    radioProps.disabled = props.disabled || context.disabled;
  }

  console.log('context :>> ', context);
  console.log('props :>> ', props);
  const classNames = cn(
    'ebs-radio2',
    {
      [`ebs-radio--checked`]: radioProps.checked,
      [`ebs-radio--disabled`]: radioProps.disabled,
    },
    className,
  );
  return (
    <div className={classNames} style={style as React.CSSProperties}>
      <label>
        <input ref={ref} onChange={handleChange} {...(radioProps as any)} />
        <span className="design"></span>
        <span className="text">{children}</span>
      </label>
    </div>
  );
};

const Radio = React.forwardRef<HTMLInputElement, RadioProps>(InternalRadio);

Radio.displayName = 'Radio';

export default Radio;

// // name attribute makes it grouped ones

// const InternalRadio = React.forwardRef<HTMLInputElement, RadioProps>((props, ref) => {
//   const { className, children, style, ...restProps } = props;
//   const context = React.useContext(RadioGroupContext);

//   // const onChange = (e: RadioChangeEvent) => {
//   //   if (props.onChange) {
//   //     props.onChange(e);
//   //   }

//   //   if (context?.onChange) {
//   //     context.onChange(e);
//   //   }
//   // };

//   // const radioProps: RadioProps = { ...restProps };
//   // if (context) {
//   //   radioProps.name = context.name;
//   //   radioProps.onChange = onChange;
//   //   radioProps.checked = props.value === context.value;
//   //   radioProps.disabled = props.disabled || context.disabled;
//   // }

//   return (
//     <div className="ebs-radio2">
//       <label>
//         <input ref={ref} type="radio" name="light" value={props.value} checked />
//         <span className="design"></span>
//         <span className="text">{children}</span>
//       </label>
//     </div>
//   );
// });

// const Radio = InternalRadio as RadioComposition;

// Radio.Group = RadioGroup;

// // export { Button, Group };

// export { Radio };
