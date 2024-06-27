import React from 'react';
import { Helmet } from 'react-helmet-async';

const Metas = ({ title }) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="title" content="LEGOLEGO — 내가 만드는 패키지 여행" />
      <meta
        name="description"
        content="레고레고와 함께 나만의 여행을 만들어보세요!"
      />

      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://metatags.io/" />
      <meta property="og:title" content="LEGOLEGO — 내가 만드는 패키지 여행" />
      <meta
        property="og:description"
        content="레고레고와 함께 나만의 여행을 만들어보세요!"
      />
      <meta
        property="og:image"
        content="https://metatags.io/images/meta-tags.png"
      />

      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content="https://metatags.io/" />
      <meta
        property="twitter:title"
        content="LEGOLEGO — 내가 만드는 패키지 여행"
      />
      <meta
        property="twitter:description"
        content="레고레고와 함께 나만의 여행을 만들어보세요!"
      />
      <meta
        property="twitter:image"
        content="https://metatags.io/images/meta-tags.png"
      />
    </Helmet>
  );
};

export default Metas;
