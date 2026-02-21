import { lazy } from 'react';
import { competitors } from '../../data/competitors';

const ComparePage = lazy(() => import('./ComparePage'));

const NestAwayCompare = () => {
  const competitor = competitors.nestaway;
  
  return (
    <ComparePage
      competitor={competitor}
      pageTitle="360 Ghar vs NestAway | Reliable Rental Property Platform"
      pageDescription="Compare 360 Ghar with NestAway. See why verified properties, transparent pricing, and financial stability make 360 Ghar the better rental platform."
      canonicalPath="/vs/nestaway"
    />
  );
};

export default NestAwayCompare;
