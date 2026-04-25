import { Header }          from "@/components/header"
import { Hero }             from "@/components/hero"
import { ClientShowcase }   from "@/components/client-showcase"
import { FeaturedWork }     from "@/components/featured-work"
import { SystemSection }    from "@/components/system-section"
import { StatsSection }     from "@/components/stats-section"
import { Capabilities }     from "@/components/capabilities"
import { FeaturesSection }  from "@/components/features-section"
import { Operators }        from "@/components/operators"
import { BillboardStrip }   from "@/components/billboard-strip"
import { Testimonials }     from "@/components/testimonials"
import { BuildBrief }       from "@/components/build-brief"
import { BlogSection }      from "@/components/blog-section"
import { Philosophy }       from "@/components/philosophy"
import { CtaSection }       from "@/components/cta-section"
import { ContactSection }   from "@/components/contact-section"
import { Footer }           from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen" style={{ background: "#0A0A0C" }}>
      <Header />
      <Hero />
      <ClientShowcase />
      <FeaturedWork />
      <SystemSection />
      <StatsSection />
      <Capabilities />
      <FeaturesSection />
      <Operators />
      <BillboardStrip />
      <Testimonials />
      <BuildBrief />
      <BlogSection />
      <Philosophy />
      <CtaSection />
      <ContactSection />
      <Footer />
    </main>
  )
}
