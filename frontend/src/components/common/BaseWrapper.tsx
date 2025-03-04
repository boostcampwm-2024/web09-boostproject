type BaseWrapperProps = {
  children: React.ReactNode;
  position?: string;
  left?: string;
  top?: string;
  className?: string;
};

const BaseWrapper = ({
  children,
  position = 'absolute',
  left = 'left-0',
  top = 'top-0',
  className = '',
}: BaseWrapperProps) => (
  <div
    className={`${position} ${left} ${top} pointer-events-auto flex h-full flex-col gap-0.5 bg-gray-200 ${className}`}
  >
    {children}
  </div>
);

export default BaseWrapper;
