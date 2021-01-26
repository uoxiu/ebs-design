import * as React from 'react';
import DatePicker, { registerLocale } from 'react-datepicker';
import * as translates from 'date-fns/locale';
import cn from 'classnames';
import { format, dateTimeFormat, dateTimeFormatInput, dateFormatInput } from 'libs/date';
import { Extra, Label } from 'components/atoms';

import { DateState, LimitTimeState } from './Calendar.types';

export { registerLocale } from 'react-datepicker';

export type CalendarType = 'period' | 'date' | 'date-time';

interface Props {
  type: CalendarType;
  placeholder?: string;
  startPlaceholder?: string;
  endPlaceholder?: string;
  className?: string;
  withTime?: boolean;
  languages?: string[];
  onChange?: (values?: string | (string | undefined)[] | null) => void;
  minDate?: Date;
  locale?: string;
  label?: React.ReactNode;
  extra?: React.ReactNode;
  hasError?: boolean;
  disabled?: boolean;
  iconAlign?: 'left' | 'right';

  from?: any;
  to?: any;
  date?: any;
}

export const Calendar = React.forwardRef<any, Props>(
  (
    {
      type = 'period',
      placeholder = '',
      startPlaceholder = '',
      endPlaceholder = '',
      iconAlign = 'right',
      languages = [],
      className,
      withTime,
      onChange,
      minDate,
      locale,
      label,
      extra,
      hasError,
      disabled,
      ...props
    },
    ref,
  ) => {
    const [{ from, to, date }, setDate] = React.useState<DateState>({
      from: null,
      to: null,
      date: null,
    });

    const periodFormat = React.useMemo(() => (withTime ? dateTimeFormatInput : dateFormatInput), [withTime]);

    React.useEffect(() => {
      registerLocale('en', translates['enGB']);

      languages.map((language) => registerLocale(language, translates[language]));
    }, [languages]);

    // Period type
    React.useEffect(() => {
      if (onChange && from && (!props.from || (props.from && new Date(props.from).toString() !== from.toString()))) {
        const startDate = from ? format(from, withTime ? dateTimeFormat : undefined) : undefined;

        onChange(startDate);
      }
    }, [from]);

    React.useEffect(() => {
      if (onChange && to && (!props.to || (props.to && new Date(props.to).toString() !== to.toString()))) {
        const endDate = to ? format(to, withTime ? dateTimeFormat : undefined) : undefined;

        onChange(endDate);
      }
    }, [to]);

    React.useEffect(() => {
      if (onChange) {
        const startDate = from ? format(from, withTime ? dateTimeFormat : undefined) : undefined;
        const endDate = to ? format(to, withTime ? dateTimeFormat : undefined) : undefined;

        onChange([startDate, endDate]);
      }
    }, [from, to]);

    // DateTime type
    React.useEffect(() => {
      if (onChange) {
        const dateTime = date ? format(date, type === 'date-time' ? dateTimeFormat : undefined) : undefined;

        onChange(dateTime);
      }
    }, [date]);

    React.useEffect(() => {
      setDate((prevState) => {
        const newState: { [key: string]: any } = {};

        if (typeof props.from === 'string' || typeof props.to === 'string') {
          newState.from = props.from ? new Date(props.from) : props.from;
          newState.to = props.to ? new Date(props.to) : props.to;
        }

        if (props.date) {
          newState.date =
            !prevState.date && props.date
              ? new Date(format(props.date, type === 'date-time' ? dateTimeFormat : undefined))
              : prevState.date;
        }

        if (['from', 'to', 'date'].filter((i) => i in newState).length) {
          return { ...prevState, ...newState };
        }

        return prevState;
      });
    }, [props.from, props.to, props.date]);

    const onChangeDate = (value: Date | [Date, Date] | null): boolean | void =>
      !Array.isArray(value) &&
      setDate((prevState) => ({
        ...prevState,
        date:
          value && minDate && minDate > value
            ? new Date(new Date(minDate.setHours(value.getHours())).setMinutes(value.getMinutes()))
            : value,
      }));

    const onChangeFrom = (value: Date | [Date, Date] | null): boolean | void =>
      !Array.isArray(value) && setDate((prevState) => ({ ...prevState, from: value }));

    const onChangeTo = (value: Date | [Date, Date] | null): boolean | void =>
      !Array.isArray(value) && setDate((prevState) => ({ ...prevState, to: value }));

    const limitTime = React.useMemo(
      (): LimitTimeState => ({
        min: new Date(new Date(new Date().setHours(6)).setMinutes(0)),
        max: new Date(new Date(new Date().setHours(21)).setMinutes(0)),
      }),
      [],
    );

    return (
      <div
        className={cn(`ebs-calendar__wrapper`, `ebs-calendar--${type}`, className, {
          'ebs-calendar--left': iconAlign === 'left',
          disabled: disabled,
          'has-error': hasError,
          active: from || to || date,
        })}
      >
        <Label text={label} disabled={disabled} />

        <div className="ebs-calendar__input-wrapper">
          {type === 'period' && (
            <>
              <DatePicker
                ref={ref}
                showTimeSelect={withTime}
                showYearDropdown
                scrollableYearDropdown
                dateFormat={periodFormat}
                placeholderText={startPlaceholder || withTime ? dateTimeFormatInput : dateFormatInput}
                className={cn(`ebs-calendar`, { active: from })}
                selected={from}
                onChange={onChangeFrom}
                selectsStart
                startDate={from}
                endDate={to}
                locale={locale}
                timeIntervals={5}
                disabled={disabled}
              />

              <DatePicker
                ref={ref}
                showTimeSelect={withTime}
                showYearDropdown
                scrollableYearDropdown
                dateFormat={periodFormat}
                minDate={from || minDate}
                minTime={limitTime.min}
                maxTime={limitTime.max}
                placeholderText={endPlaceholder || withTime ? dateTimeFormatInput : dateFormatInput}
                className={cn(`ebs-calendar`, { active: to })}
                selected={to}
                onChange={onChangeTo}
                selectsEnd
                startDate={from}
                endDate={to}
                locale={locale}
                timeIntervals={5}
                showDisabledMonthNavigation={false}
                disabled={disabled}
              />
            </>
          )}

          {type === 'date' && (
            <DatePicker
              ref={ref}
              showYearDropdown
              scrollableYearDropdown
              dateFormat={dateFormatInput}
              minDate={minDate}
              className={cn(`ebs-calendar`, { active: date })}
              placeholderText={placeholder || dateFormatInput}
              selected={date}
              onChange={onChangeDate}
              locale={locale}
              disabled={disabled}
            />
          )}

          {type === 'date-time' && (
            <DatePicker
              ref={ref}
              showTimeSelect
              showYearDropdown
              scrollableYearDropdown
              dateFormat={dateTimeFormatInput}
              minDate={minDate}
              minTime={limitTime.min}
              maxTime={limitTime.max}
              placeholderText={placeholder || dateTimeFormatInput}
              className={cn(`ebs-calendar`, { active: date })}
              selected={date}
              onChange={onChangeDate}
              timeIntervals={5}
              locale={locale}
              showDisabledMonthNavigation={false}
              disabled={disabled}
            />
          )}
        </div>

        <Extra text={extra} status={hasError ? 'danger' : 'text'} disabled={disabled} />
      </div>
    );
  },
);
