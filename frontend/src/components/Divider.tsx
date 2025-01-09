import { FC } from 'react';
import classNames from 'classnames';

interface DividerProps {
  orientation?: 'horizontal' | 'vertical';
  className?: string;
  thickness?: number;
  style?: 'solid' | 'dashed' | 'dotted';
}

const Divider: FC<DividerProps> = ({
  orientation = 'horizontal',
  className = '',
  thickness = 1,
  style = 'solid',
}) => {
  const dividerClasses = classNames(
    // Base classes
    'flex',
    // Orientation specific classes
    {
      'w-full': orientation === 'horizontal',
      'h-full': orientation === 'vertical',
    },
    // Border styles
    {
      [`border-${style}`]: style !== 'solid',
    },
    // Border color and thickness
    `border-[#F0F0F0]`,
    {
      'border-t': orientation === 'horizontal',
      'border-l': orientation === 'vertical',
      'border-t-2': orientation === 'horizontal' && thickness === 2,
      'border-l-2': orientation === 'vertical' && thickness === 2,
      'border-t-4': orientation === 'horizontal' && thickness === 4,
      'border-l-4': orientation === 'vertical' && thickness === 4,
    },
    className
  );

  return <div className={dividerClasses} />;
};

export default Divider;
