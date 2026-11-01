/**
 * NOCTIS TECHNOLOGIES — SEO MASTER (client-side fallback)
 * Fills missing meta tags on any page. Never overwrites existing.
 */
(function () {
  'use strict';
  var BRAND = {
    name: 'Noctis Technologies',
    url: 'https://www.noctistechnologies.gt.tc',
    phone: '+91-95432-128730',
    email: 'hello@noctistechnologies.com',
    defaultImage: '',
    locale: 'en_IN'
  };
  var path = window.location.pathname.toLowerCase();
  var pageType = 'home';
  if (path.indexOf('/tamil-nadu/towns/') === 0) pageType = 'tn_town';
  else if (path.indexOf('/tamil-nadu/') === 0) pageType = 'tn_district';
  else if (path.indexOf('/india/cities/') === 0) pageType = 'in_city';
  else if (path.indexOf('/about') >= 0) pageType = 'about';
  else if (path.indexOf('/services') >= 0) pageType = 'services';
  else if (path.indexOf('/contact') >= 0) pageType = 'contact';

  var DEFAULTS = {
    home:        { title: BRAND.name + ' — Web Development, E-Commerce & SEO in India | From ₹1,999',
                   desc:  'Noctis Technologies builds modern websites, e-commerce stores, UI/UX, SEO and business systems. Based in Tirupur, Tamil Nadu, serving businesses across India.' },
    about:       { title: 'About Noctis Technologies — Founder Sam Immanuel J', desc: 'Learn about Noctis Technologies, founded by Sam Immanuel J in Tirupur, Tamil Nadu.' },
    services:    { title: 'Services — Web, E-Commerce, SEO & AI | Noctis Technologies', desc: 'Website development, e-commerce, UI/UX, SEO, AI automation and business systems. From ₹1,999.' },
    contact:     { title: 'Contact — Get a Free Quote | Noctis Technologies', desc: 'Contact Noctis Technologies for website development, e-commerce and SEO.' },
    tn_district: { title: 'Website Development in Tamil Nadu | Noctis Technologies', desc: 'Custom websites, e-commerce and SEO for Tamil Nadu businesses. Remote-first from Tirupur. From ₹1,999.' },
    tn_town:     { title: 'Website Development in Tamil Nadu Towns | Noctis Technologies', desc: 'Websites and e-commerce for Tamil Nadu towns. Remote-first from Tirupur. From ₹1,999.' },
    in_city:     { title: 'Website Development in India | Noctis Technologies', desc: 'Websites, e-commerce and SEO for businesses across India. Remote-first from Tirupur. From ₹1,999.' }
  };
  var override = window.NOCTIS_META || {};
  var base = DEFAULTS[pageType] || DEFAULTS.home;
  var meta = {
    title: override.title || base.title,
    desc:  override.desc  || base.desc,
    path:  override.path  || window.location.pathname,
    image: override.image || BRAND.defaultImage
  };
  function hasMeta(sel) { return !!document.querySelector(sel); }
  function setMetaName(n, c) { if (hasMeta('meta[name="'+n+'"]')) return; var e=document.createElement('meta'); e.setAttribute('name',n); e.setAttribute('content',c); document.head.appendChild(e); }
  function setMetaProp(p, c) { if (hasMeta('meta[property="'+p+'"]')) return; var e=document.createElement('meta'); e.setAttribute('property',p); e.setAttribute('content',c); document.head.appendChild(e); }
  function setCanonical(h) { if (hasMeta('link[rel="canonical"]')) return; var e=document.createElement('link'); e.rel='canonical'; e.href=h; document.head.appendChild(e); }
  function setTitle(t) { if (document.title && document.title.trim() && document.title !== 'Document') return; document.title = t; }
  var currentUrl = BRAND.url.replace(/\/$/,'') + meta.path;
  var imageUrl   = BRAND.url.replace(/\/$/,'') + meta.image;
  setTitle(meta.title);
  setMetaName('description', meta.desc);
  setMetaName('robots', 'index, follow, max-image-preview:large');
  setMetaProp('og:type', 'website');
  setMetaProp('og:site_name', BRAND.name);
  setMetaProp('og:title', meta.title);
  setMetaProp('og:description', meta.desc);
  setMetaProp('og:url', currentUrl);
  if (meta.image && meta.image !== '') setMetaProp('og:image', imageUrl);
  setMetaProp('og:locale', BRAND.locale);
  setMetaName('twitter:card', 'summary_large_image');
  setMetaName('twitter:title', meta.title);
  setMetaName('twitter:description', meta.desc);
  if (meta.image && meta.image !== '') setMetaName('twitter:image', imageUrl);
  setCanonical(currentUrl);
})();
