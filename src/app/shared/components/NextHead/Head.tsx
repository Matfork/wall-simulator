import React from 'react';
import NextHead from 'next/head';

const defaultDescription = '';

interface HeadProps {
  title?: string;
  description?: string;
}

const Head: React.SFC<HeadProps> = props => (
  <NextHead>
    <meta charSet="UTF-8" />
    <title>{`Wall Experience: ${props.title}` || 'Wall Experience'}</title>
    <meta
      name="description"
      content={props.description || defaultDescription}
    />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link rel="icon" sizes="192x192" href="/static/touch-icon.png" />
    <link rel="apple-touch-icon" href="/static/touch-icon.png" />
    <link rel="mask-icon" href="/static/favicon-mask.svg" color="#49B882" />
    <link rel="icon" href="/static/favicon.ico" />
  </NextHead>
);

export default Head;
