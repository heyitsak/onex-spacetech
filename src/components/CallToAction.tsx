export default function CallToAction() {
  return (
    <section className="section-padding pt-0">
      <div className="container-xl">
        <div className="card-elevated p-12 sm:p-16 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#E8ECF4] tracking-tight mb-4">
            Join the Community
          </h2>
          <p className="text-[#8A92A5] text-sm sm:text-base font-light max-w-lg mx-auto mb-8 leading-relaxed">
            Connect with builders, engineers, and explorers pushing the boundaries of technology and space.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="/contact" className="btn-primary px-8 py-3 text-sm">
              Get Started
            </a>
            <a href="/courses" className="btn-secondary px-8 py-3 text-sm">
              View Courses
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
