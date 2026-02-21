import { lazy } from 'react';
import { competitors } from '../../data/competitors';

const ComparePage = lazy(() => import('./ComparePage'));

const StanzaCompare = () => {
  const competitor = competitors.stanza;
  
  return (
    <ComparePage
      competitor={competitor}
      pageTitle="360 Ghar vs Stanza Living | Better Managed Accommodation"
      pageDescription="Compare 360 Ghar with Stanza Living. See why consistent quality, transparent pricing, and responsive maintenance make 360 Ghar the better choice."
      canonicalPath="/vs/stanza-living"
    />
  );
};

export default StanzaCompare;
