import { Helmet } from "react-helmet-async";

const SEO = () => {
  return (
    <Helmet>
      {/* PRIMARY SEO */}
      <title>
        Ujjwal Academy Mauganj | SSC, Railway & Government Exam Coaching
      </title>
      <meta
        name="description"
        content="Ujjwal Academy Mauganj is the best coaching institute for SSC, Railway, Banking and Government exams in Mauganj, Madhya Pradesh. Expert faculty, test series and proven results."
      />
      <meta
        name="keywords"
        content="Ujjwal Academy Mauganj, SSC Coaching Mauganj, Railway Coaching Mauganj, Government Exam Coaching Mauganj, Best Coaching Institute in Mauganj, SSC Railway Coaching MP"
      />
      <meta name="robots" content="index, follow" />
      <link
        rel="canonical"
        href="https://test-series-ujwal-academy.vercel.app/"
      />

      {/* OPEN GRAPH */}
      <meta property="og:type" content="website" />
      <meta
        property="og:title"
        content="Ujjwal Academy Mauganj | SSC & Railway Coaching Institute"
      />
      <meta
        property="og:description"
        content="Join Ujjwal Academy Mauganj for SSC, Railway and Government exam preparation. Trusted coaching institute with high success rate."
      />
      <meta
        property="og:url"
        content="https://test-series-ujwal-academy.vercel.app/"
      />
      <meta property="og:site_name" content="Ujjwal Academy Mauganj" />

      {/* TWITTER */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta
        name="twitter:title"
        content="Ujjwal Academy Mauganj | Government Exam Coaching"
      />
      <meta
        name="twitter:description"
        content="Best SSC & Railway coaching institute in Mauganj, Madhya Pradesh."
      />

      {/* LOCAL SEO */}
      <meta name="geo.region" content="IN-MP" />
      <meta name="geo.placename" content="Mauganj" />
      <meta name="geo.position" content="24.6671;81.8780" />
      <meta name="ICBM" content="24.6671, 81.8780" />
    </Helmet>
  );
};

export default SEO;
