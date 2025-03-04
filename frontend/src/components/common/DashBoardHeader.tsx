import { ROUTES } from '@/constants/routes';
import PrevNavButton from './NavButton';

type DashBoardHeaderProps = {
  title: string;
  hasNavButton?: boolean;
};

const DashBoardHeader = ({
  title,
  hasNavButton = true,
}: DashBoardHeaderProps) => {
  return (
    <header className="flex gap-2">
      {hasNavButton && <PrevNavButton to={ROUTES.ROOT} />}
      <h2 className="p-4 text-xl font-semibold" id="review-heading">
        {title}
      </h2>
    </header>
  );
};

export default DashBoardHeader;
