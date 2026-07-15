import { Helmet } from "react-helmet-async"
import { schema } from "./seo/schema.js"
import { useLang } from "./i18n.jsx"
import Header from "./components/Header.jsx"
import Hero from "./components/Hero.jsx"
import Services from "./components/Services.jsx"
import Technologies from "./components/Technologies.jsx"
import Process from "./components/Process.jsx"
import Pricing from "./components/Pricing.jsx"
import Portfolio from "./components/Portfolio.jsx"
import Testimonials from "./components/Testimonials.jsx"
import Contact from "./components/Contact.jsx"
import Footer from "./components/Footer.jsx"

export default function App() {
  const { t } = useLang()
  return (
    <>
      <Helmet>
        <title>{t.seo.title}</title>

        <meta name="description" content={t.seo.description} />
        <meta name="keywords" content={t.seo.keywords} />

        <meta property="og:title" content={t.seo.title} />
        <meta property="og:description" content={t.seo.description} />
        <meta property="og:image" content="/preview.jpg" />
        <meta property="og:url" content="https://твій-домен.com" />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="uk_UA" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={t.seo.title} />
        <meta name="twitter:description" content={t.seo.description} />
        <meta name="twitter:image" content="/preview.jpg" />

        <link rel="canonical" href="https://твій-домен.com" />

        <script type="application/ld+json">{JSON.stringify(schema)}</script>
      </Helmet>
      <Header />
      <main>
        <Hero />
        <Services />
        <Technologies />
        <Process />
        <Pricing />
        <Portfolio />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
