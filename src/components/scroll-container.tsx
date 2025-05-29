interface Props {
  children: React.ReactNode;
  className?: string;
  callback: () => void;
  shouldCallback?: boolean;
}

const ScrollContainer = ({
  children,
  className,
  callback,
  shouldCallback,
}: Props) => {
  const handleScroll = (event: React.UIEvent<HTMLDivElement, UIEvent>) => {
    const { scrollTop, scrollHeight, clientHeight } = event.currentTarget;

    const offset = 10;

    if (scrollHeight - scrollTop - clientHeight <= offset) {
      if (shouldCallback) callback();
    }
  };

  return (
    <div className={className} onScroll={handleScroll}>
      {children}
    </div>
  );
};

export default ScrollContainer;
