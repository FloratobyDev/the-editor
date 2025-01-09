import React, { useState } from 'react';
import classNames from 'classnames';

interface SwitchProps {
  initialState?: boolean;
  onLabel?: string;
  offLabel?: string;
  className?: string;
}

const Switch: React.FC<SwitchProps> = ({
  initialState = false,
  onLabel = "ON",
  offLabel = "OFF",
  className
}) => {
  const [isChecked, setIsChecked] = useState(initialState);

  const handleToggle = () => {
    setIsChecked(!isChecked);
  };

  return (
    <div className={classNames('flex items-center gap-3', className)}>
      <label className="inline-flex items-center cursor-pointer">
        <div className="relative">
          <input
            type="checkbox"
            className="sr-only peer"
            checked={isChecked}
            onChange={handleToggle}
          />
          <div className={classNames(
            'w-11 h-6 rounded-full transition-colors duration-200 ease-in-out',
            'after:content-[""] after:absolute after:top-[2px] after:left-[2px]',
            'after:bg-white after:border-gray-300 after:border after:rounded-full',
            'after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full',
            'bg-gray-200 peer-checked:bg-blue-600',
            'after:duration-200'
          )}/>
        </div>
        <span className="ml-3 text-sm font-medium text-gray-900">
          {isChecked ? onLabel : offLabel}
        </span>
      </label>
    </div>
  );
};

export default Switch;
