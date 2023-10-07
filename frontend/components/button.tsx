import React from 'react';

const validVariants = ['primary'] as const;

type ValidVariant = typeof validVariants[number];

type ButtonProps = {
  children: React.ReactNode;
  variant: ValidVariant;
};

const Button: React.FC<ButtonProps> = ({ children, variant}) => {
  let variants = {
    primary: 'text-white font-semibold bg-pink-500 rounded-md py-2.5 px-[18px] text-base'
  }

  return (
    <button style={{ ...(variants as any)[variant] }} className={`${variants['primary']}`}>
      {children}
    </button>
  );
};

export default Button;
