import * as React from 'react';
import { RadioChangeEvent } from './interface';

export interface RadioGroupContextProps {
  onChange: (e: RadioChangeEvent) => void;
  value: any;
  disabled?: boolean;
  name?: string;
}

export const RadioGroupContext = React.createContext<RadioGroupContextProps | null>(null);
