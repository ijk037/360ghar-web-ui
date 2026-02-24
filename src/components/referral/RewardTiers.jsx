const RewardTiers = () => {
  const tiers = [
    {
      title: 'Onboarding Bonus',
      amount: '₹100',
      description: 'Earn ₹100 when the referred property is verified and successfully listed on 360Ghar.',
      icon: 'fas fa-rocket',
      highlight: false,
      conditions: [
        'Property must pass on-ground verification',
        'Listing must be published on platform',
        'Paid within 7 days of listing',
      ],
    },
    {
      title: 'Deal Completion Bonus',
      amount: 'Up to ₹10,000',
      description: 'Earn a percentage of brokerage when the property gets rented or sold through 360Ghar.',
      icon: 'fas fa-trophy',
      highlight: true,
      conditions: [
        'Rent deals: 10% of brokerage (max ₹5,000)',
        'Sale deals: 5% of brokerage (max ₹10,000)',
        'Paid within 15 days of deal closure',
      ],
    },
  ];

  return (
    <section className="reward-tiers padding-y-60 bg-light">
      <div className="container container-two">
        <div className="row justify-content-center mb-40">
          <div className="col-lg-8 text-center">
            <h2 className="section-heading">Reward Structure</h2>
            <p className="section-desc">Earn at every stage of the referral journey</p>
          </div>
        </div>

        <div className="row g-4 justify-content-center">
          {tiers.map((tier, index) => (
            <div className="col-lg-5 col-md-6" key={index}>
              <div className={`reward-card ${tier.highlight ? 'reward-card--highlight' : ''}`}>
                {tier.highlight && <div className="reward-card__badge">Most Popular</div>}
                <div className="reward-card__icon">
                  <i className={tier.icon}></i>
                </div>
                <h3 className="reward-card__title">{tier.title}</h3>
                <div className="reward-card__amount">{tier.amount}</div>
                <p className="reward-card__desc">{tier.description}</p>
                <ul className="reward-card__conditions">
                  {tier.conditions.map((condition, cIndex) => (
                    <li key={cIndex}>
                      <i className="fas fa-check-circle"></i>
                      {condition}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RewardTiers;
