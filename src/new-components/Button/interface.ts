import { SizeType } from 'types';

export type ButtonHTML = Omit<
  React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>,
  'type' | 'prefix'
>;

export type ButtonHTMLType = 'submit' | 'reset' | 'button';
export type ButtonType = 'text' | 'primary' | 'fill' | 'ghost' | 'dark' | 'light';

export interface ButtonProps extends ButtonHTML {
  size?: SizeType;
  type?: ButtonType;
  htmlType?: ButtonHTMLType;
  /**
   * Replaces button text with a spinner while a background action is being performed
   */
  loading?: boolean;
  submit?: boolean;
  prefix?: React.ReactNode;
  /**
   * Icon to display to the left of the button content
   */
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  /**
   * Allows the button to grow to the width of its container
   */
  block?: boolean;
  textAlign?: 'left' | 'center' | 'right';
}

export interface ButtonGroupProps {
  className?: string;
}

export interface ButtonComposition
  extends React.ForwardRefExoticComponent<ButtonProps & React.RefAttributes<HTMLButtonElement>> {
  Group: React.FC<ButtonGroupProps>;
}
