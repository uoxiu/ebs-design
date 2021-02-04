import { GenericObject } from 'types';
import { LabelOptions, ControlOptions } from './interface';

export const combineProps = (...args): GenericObject => Object.assign({}, ...args);

export const getLabelOptions = (type: string, labelOptions?: LabelOptions): LabelOptions => {
  if (type === 'vertical') {
    return {
      align: labelOptions?.align ? labelOptions.align : 'center',
      justify: labelOptions?.justify ? labelOptions.justify : 'start',
      col: labelOptions?.col
        ? labelOptions.col
        : {
            size: 12,
          },
    };
  }

  return {
    align: labelOptions?.align ? labelOptions.align : 'center',
    justify: labelOptions?.justify ? labelOptions.justify : 'end',
    col: labelOptions?.col
      ? labelOptions.col
      : {
          size: 4,
        },
  };
};

export const getControlOptions = (type: string, controlOptions?: ControlOptions): ControlOptions => {
  if (type === 'vertical') {
    return {
      col: controlOptions?.col
        ? controlOptions.col
        : {
            size: 12,
          },
    };
  }

  return {
    col: controlOptions?.col
      ? controlOptions.col
      : {
          size: 8,
        },
  };
};