import * as React from 'react';
import { LoaderSpinner } from 'atoms';

import './Input.scss';

export type InputType = 'text' | 'email' | 'password';

export interface InputProps {
  type?: InputType;
  onClick?: (e: any) => void;
  onChange?: (value: string) => void;
  onClickPrefix?: () => void;
  onClickSuffix?: () => void;
  hasError?: boolean;
  label?: React.ReactNode;
  extra?: React.ReactNode;
  name?: string;
  value?: string | number | null | undefined;
  prefix?: React.ReactElement;
  suffix?: React.ReactElement;
  placeholder?: string;
  loading?: boolean;
  disabled?: boolean;
  width?: number | string;
  className?: string;
}

export const Input = React.forwardRef<any, InputProps>(
  (
    {
      type = 'text',
      onClick,
      onChange,
      hasError,
      label,
      extra,
      name,
      value,
      prefix,
      suffix,
      loading,
      disabled,
      width,
      className = '',
      ...props
    },
    ref,
  ) => {
    const onClickHandler = ({ target }: React.ChangeEvent<HTMLInputElement>): void => {
      if (onChange !== undefined) {
        onChange(target.value);
      }
    };

    const onClickPrefixHandler = (): void => {
      if (!loading && props.onClickPrefix !== undefined) {
        props.onClickPrefix();
      }
    };

    const onClickSuffixHandler = (): void => {
      if (!loading && props.onClickSuffix !== undefined) {
        props.onClickSuffix();
      }
    };

    return (
      <>
        {label && <div className={`ebs-input-label${disabled ? ' disabled' : ''}`}>{label}</div>}

        <div
          className={`ebs-input-wrapper ${value === '' ? 'ebs-input-empty' : ''} ebs-input-wrapper-${
            value ? 'active' : 'unactive'
          } ebs-input-type-${type}${prefix !== undefined ? ' has-prefix' : ''} ${
            suffix !== undefined ? ' has-suffix' : ''
          }${disabled ? ' disabled' : ''}${hasError ? ' has-error' : ''} ${className}`}
        >
          {loading || prefix ? (
            <div
              className={`ebs-input-prefix ${
                !loading && props.onClickPrefix !== undefined ? 'clickable' : 'not-clickable'
              }`}
              onClick={onClickPrefixHandler}
            >
              {loading ? <LoaderSpinner size="small" /> : prefix}
            </div>
          ) : null}

          {suffix ? (
            <div
              className={`ebs-input-suffix ${
                !loading && props.onClickSuffix !== undefined ? 'clickable' : 'not-clickable'
              }`}
              onClick={onClickSuffixHandler}
            >
              {loading && !prefix ? <LoaderSpinner size="small" /> : suffix}
            </div>
          ) : null}

          <div className="ebs-input-container">
            <input
              name={name}
              ref={ref}
              type={type}
              className="ebs-input"
              value={value || ''}
              onChange={onClickHandler}
              placeholder={props.placeholder}
              disabled={disabled || loading}
              onClick={onClick}
              style={{ minWidth: width }}
            />
          </div>
        </div>

        {extra && (
          <div className={`ebs-input-extra${disabled ? ' disabled' : ''}${hasError ? ' has-error' : ''}`}>{extra}</div>
        )}
      </>
    );
  },
);