const HowItWorks = () => {
  const steps = [
    {
      number: '01',
      icon: 'fas fa-user-plus',
      title: 'Submit Referral',
      description: 'Fill out the form with property owner details and property information. Make sure you have their consent.',
    },
    {
      number: '02',
      icon: 'fas fa-check-circle',
      title: 'Property Verification',
      description: 'Our team verifies the property on-ground. Once listed successfully, you earn ₹100 instantly.',
    },
    {
      number: '03',
      icon: 'fas fa-handshake',
      title: 'Deal Completion',
      description: 'When the property gets rented or sold through 360Ghar, earn up to ₹10,000 as referral bonus.',
    },
  ];

  return (
    <section className="how-it-works padding-t-60">
      <div className="container container-two">
        <div className="row justify-content-center mb-40">
          <div className="col-lg-8 text-center">
            <h2 className="section-heading">How It Works</h2>
            <p className="section-desc">Three simple steps to start earning rewards</p>
          </div>
        </div>

        <div className="row g-4">
          {steps.map((step, index) => (
            <div className="col-lg-4 col-md-6" key={index}>
              <div className="how-it-works-card">
                <div className="how-it-works-card__number">{step.number}</div>
                <div className="how-it-works-card__icon">
                  <i className={step.icon}></i>
                </div>
                <h3 className="how-it-works-card__title">{step.title}</h3>
                <p className="how-it-works-card__desc">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
