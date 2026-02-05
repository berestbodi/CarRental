interface IconProps {
  id: string;
  className?: string;
  onClick?: () => void;
}

export const Icon = ({ id, className, onClick }: IconProps) => {
  return (
    <svg className={className} onClick={onClick}>
      <use href={`/sprite.svg#${id}`} />
    </svg>
  );
};
