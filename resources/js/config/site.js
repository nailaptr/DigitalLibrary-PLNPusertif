// Central cross-system contact/location config (frontend).
//
// Every value below is copied verbatim from the pre-existing UI — nothing here
// is confirmed official. Items marked UNVERIFIED are tracked in
// docs/ai-context/OPEN-DECISIONS.md (OD-001: IT support contact, OD-002: map URL).
// After PLN confirms a value, update it HERE (single source of truth) and close
// the corresponding OD entry. Do not hardcode these strings elsewhere.

export const siteConfig = {
  site: {
    brand: 'PLN Pusertif',
  },
  // UNVERIFIED (OD-001): official website, support email, and service phone
  // have not been confirmed. Do not treat these as authoritative.
  support: {
    websiteUrl: 'https://pusertif.pln.co.id', // UNVERIFIED (OD-001)
    supportEmail: 'support@pusertif.pln.co.id', // UNVERIFIED (OD-001)
    servicePhone: '+62217982245', // UNVERIFIED (OD-001)
  },
  // UNVERIFIED (OD-002): map embed + link + address have not been confirmed
  // as the official PLN Pusertif location. Do not treat these as authoritative.
  location: {
    addressLines: [
      'Pusat Sertifikasi (Pusertif) PT PLN (Persero),',
      'Jl. Laboratorium No. 1, Duren Tiga, Pancoran,',
      'Jakarta Selatan 12760, Indonesia',
    ], // UNVERIFIED (OD-002)
    mapEmbedUrl:
      'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.115764020967!2d106.83789537499066!3d-6.248473793739775!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f3d9bfa2dbb5%3A0xb3fffa0018a1a3bf!2sPT%20PLN%20(Persero)%20Pusat%20Sertifikasi!5e0!3m2!1sid!2sid!4v1700000000000!5m2!1sid!2sid', // UNVERIFIED (OD-002)
    mapLinkUrl:
      'https://maps.google.com/?q=PT+PLN+(Persero)+Pusat+Sertifikasi+Jakarta', // UNVERIFIED (OD-002)
  },
};

export default siteConfig;
