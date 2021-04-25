import * as React from 'react';
import cn from 'classnames';
import { usePopperTooltip, Config, PopperOptions } from 'react-popper-tooltip';
import 'react-popper-tooltip/dist/styles.css';

export interface TooltipProps extends Config {
  content?: React.ReactNode;
  style?: React.CSSProperties;
  className?: string;
  overlayStyle?: React.CSSProperties;
  overlayClassName?: string;
  popperOptions?: PopperOptions;
  title?: string;
  hideArrow?: boolean;
}

export const Tooltip: React.FC<TooltipProps> = ({
  children,
  content,
  style,
  className,
  overlayStyle,
  overlayClassName,
  popperOptions,
  title,
  hideArrow = false,
  ...config
}) => {
  const { getArrowProps, getTooltipProps, setTooltipRef, setTriggerRef, visible } = usePopperTooltip(
    config,
    popperOptions,
  );

  return (
    <>
      <div ref={setTriggerRef} className={cn('ebs-tooltip__trigger', className)}>
        {children}
      </div>
      {visible && (
        <div
          ref={setTooltipRef}
          {...getTooltipProps({ className: cn('ebs-tooltip__container', overlayClassName), style: overlayStyle })}
        >
          {!hideArrow && <div {...getArrowProps({ className: 'ebs-tooltip__arrow' })} />}
          {title && <div className="ebs-tooltip__title">{title}</div>}
          {content}
        </div>
      )}
    </>
  );
};
