import { SERVICES } from "@/lib/constants";

export default function Services() {
  return (
    <section id="services" className="py-20 bg-sand/20">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <p className="text-brick-red uppercase tracking-widest text-sm font-semibold mb-3">
            What We Do
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-charcoal">
            Our Services
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {SERVICES.map((service) => (
            <div
              key={service.id}
              className="bg-white rounded-lg p-6 shadow-sm border border-sand/40 hover:shadow-md transition-shadow"
            >
              <div className="text-4xl mb-4">{service.icon}</div>
              <h3 className="text-lg font-bold text-charcoal mb-2">
                {service.title}
              </h3>
              <p className="text-slate text-sm leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
