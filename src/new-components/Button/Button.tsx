import * as React from 'react';
import cn from 'classnames';
import { Loader } from 'components';
import { ButtonGroup } from './ButtonGroup';
import { ButtonProps, ButtonComposition } from './interface';

const InternalButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      size = 'medium',
      type = 'ghost',
      submit = false,
      htmlType = 'button',
      textAlign = 'center',
      iconPosition = 'left',
      icon,
      prefix,
      className,
      loading,
      block,
      children,
      ...props
    },
    ref,
  ) => {
    const loader = loading ? (
      <div className="ebs-btn__loading">
        <Loader.Spinner size="small" />
      </div>
    ) : null;

    const renderPrefix = prefix && !loading ? <div className="ebs-btn__icon">{prefix}</div> : loader;

    return (
      <button
        {...props}
        ref={ref}
        type={submit ? 'submit' : htmlType}
        className={cn(
          `ebs-btn ebs-btn--${type} ebs-btn--${size}`,
          {
            'ebs-btn--prefix': prefix,
            'ebs-btn--block': block,
          },
          className,
        )}
      >
        {renderPrefix}
        <span className="ebs-btn__text">{children}</span>
      </button>
    );
  },
);

const Button = InternalButton as ButtonComposition;

Button.Group = ButtonGroup;

export { Button };
