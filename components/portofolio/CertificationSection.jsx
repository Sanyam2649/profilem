import { Award, Calendar, ExternalLink, Star, Shield, Zap, Trophy, BadgeCheck } from 'lucide-react';


const CertificationsSection = ({ certifications }) => {
  const parseCertifications = (certs) => {
    return certs.map(cert => {
      const patterns = [
        /(.+?) - (.+?) - (.+)/, // "AWS Certified - Amazon - 2023"
        /(.+?) from (.+?) \((.+)\)/, // "React Expert from Meta (2023)"
        /(.+?) \((.+)\) - (.+)/, // "Google Cloud Professional (2023) - Google"
        /(.+?) - (.+)/, // "Microsoft Certified - Azure Fundamentals"
      ];

      let name = cert;
      let issuer, date, url;

      for (const pattern of patterns) {
        const match = cert.match(pattern);
        if (match) {
          name = match[1]?.trim();
          issuer = match[2]?.trim();
          date = match[3]?.trim();
          break;
        }
      }

      // Extract URLs if present
      const urlMatch = cert.match(/(https?:\/\/[^\s]+)/);
      if (urlMatch) {
        url = urlMatch[1];
        name = name.replace(urlMatch[0], '').trim();
      }

      return {
        original: cert,
        name,
        issuer,
        date,
        url
      };
    });
  };

  const parsedCertifications = parseCertifications(certifications);

  const getCertificationIcon = (index) => {
    const icons = [Award, Shield, Zap, Trophy, BadgeCheck, Star];
    return icons[index % icons.length];
  };

  const formatDate = (dateString) => {
    if (!dateString) return null;
    
    // Try to parse various date formats
    const date = new Date(dateString);
    if (!isNaN(date.getTime())) {
      return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
    }
    
    // If it's just a year
    const yearMatch = dateString.match(/\b(20\d{2})\b/);
    if (yearMatch) {
      return yearMatch[1];
    }
    
    return dateString;
  };

  const getIssuerLogo = (issuer) => {
    const logos = {
      'aws': '🅰',
      'amazon': '🅰',
      'google': 'Ⓖ',
      'microsoft': 'Ⓜ',
      'meta': 'ⓕ',
      'facebook': 'ⓕ',
      'coursera': 'Ⓒ',
      'udemy': 'Ⓤ',
      'linkedin': 'Ⓛ',
      'ibm': 'Ⓘ',
      'oracle': 'Ⓞ',
      'cisco': 'Ⓒ'
    };

    const lowerIssuer = issuer.toLowerCase();
    for (const [key, logo] of Object.entries(logos)) {
      if (lowerIssuer.includes(key)) {
        return logo;
      }
    }

    return issuer.charAt(0).toUpperCase();
  };

 return (
  <section className="w-full bg-gradient-to-br from-slate-50 to-amber-50 p-6 sm:p-8 border border-amber-100">
    {/* Header */}
    <div className="text-center mb-10 sm:mb-12">
      <div className="inline-flex items-center gap-2 sm:gap-3 px-4 py-2 sm:px-6 sm:py-3 bg-white rounded-xl sm:rounded-2xl shadow-sm border border-amber-200 mb-4">
        <Award className="w-4 h-4 sm:w-5 sm:h-5 text-amber-600" />
        <span className="text-xs sm:text-sm font-semibold text-gray-700">
          Professional Credentials
        </span>
      </div>

      <h2 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-gray-900 to-amber-800 bg-clip-text text-transparent mb-3">
        Certifications
      </h2>

      <p className="text-sm sm:text-base text-gray-600 max-w-xl mx-auto leading-relaxed">
        Validated expertise through recognized and industry-standard certifications.
      </p>
    </div>

    {/* Certifications Grid */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 mb-12">
      {parsedCertifications.map((cert, index) => {
        const IconComponent = getCertificationIcon(index);
        const formattedDate = formatDate(cert.date || '');

        return (
          <div
            key={index}
            className="group bg-white rounded-xl sm:rounded-2xl p-5 sm:p-6 shadow-sm border border-gray-100 hover:shadow-lg hover:border-amber-200 transition-all duration-300 flex flex-col"
          >
            {/* Header Row */}
            <div className="flex items-start justify-between mb-4">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl flex items-center justify-center">
                <IconComponent className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>

              {/* Issuer Badge */}
              {cert.issuer && (
                <div className="flex items-center gap-1.5 px-3 py-1 bg-gray-100 rounded-full overflow-hidden">
                  <span className="text-xs font-medium text-gray-700">
                    {getIssuerLogo(cert.issuer)}
                  </span>
                  <span className="text-[10px] sm:text-xs text-gray-600 max-w-[70px] truncate">
                    {cert.issuer}
                  </span>
                </div>
              )}
            </div>

            {/* Title */}
            <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-amber-700 transition-colors">
              {cert.name}
            </h3>

            {/* Details */}
            <div className="space-y-2 mb-4 flex-1 text-gray-600">
              {cert.issuer && (
                <div className="flex items-center gap-2 text-sm">
                  <Shield className="w-4 h-4 text-amber-600" />
                  <span>Issued by {cert.issuer}</span>
                </div>
              )}

              {formattedDate && (
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="w-4 h-4 text-blue-600" />
                  <span>Earned {formattedDate}</span>
                </div>
              )}
            </div>

            {/* Action Button */}
            <div className="pt-4 border-t border-gray-100">
              {cert.url ? (
                <a
                  href={cert.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-amber-50 text-amber-700 rounded-lg sm:rounded-xl text-sm font-semibold hover:bg-amber-100 transition-colors"
                >
                  Verify Credential
                  <ExternalLink className="w-4 h-4" />
                </a>
              ) : (
                <div className="flex items-center justify-center gap-2 px-4 py-3 bg-gray-50 text-gray-600 rounded-lg sm:rounded-xl text-sm font-semibold">
                  <BadgeCheck className="w-4 h-4" />
                  Verified
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>

    {/* Summary Section */}
    <div className="bg-white p-5 sm:p-6 border border-gray-200 shadow-sm rounded-xl sm:rounded-2xl">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
        {/* Total Certifications */}
        <SummaryStat
          icon={<Award className="w-6 h-6 text-amber-600" />}
          value={certifications.length}
          label="Total Certifications"
        />

        {/* Issuers */}
        <SummaryStat
          icon={<Shield className="w-6 h-6 text-blue-600" />}
          value={
            Array.from(new Set(parsedCertifications.map((c) => c.issuer))).filter(Boolean).length
          }
          label="Issuing Orgs"
        />

        {/* Active Years */}
        <SummaryStat
          icon={<Calendar className="w-6 h-6 text-green-600" />}
          value={
            new Set(
              parsedCertifications
                .map((c) => c.date?.match(/\b(20\d{2})\b/)?.[0])
                .filter(Boolean)
            ).size
          }
          label="Active Years"
        />

        {/* Verifiable */}
        <SummaryStat
          icon={<ExternalLink className="w-6 h-6 text-purple-600" />}
          value={parsedCertifications.filter((c) => c.url).length}
          label="Verifiable"
        />
      </div>

      {/* Footer Message */}
      <div className="mt-6 pt-6 border-t border-gray-100 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-50 rounded-full border border-amber-200 text-amber-800">
          <Zap className="w-4 h-4" />
          <span className="text-xs sm:text-sm font-medium">
            Continuously expanding expertise through certified learning
          </span>
        </div>
      </div>
    </div>
  </section>
);

};

export default CertificationsSection;

  const SummaryStat = ({ icon, value, label }) => (
  <div className="space-y-3">
    <div className="flex items-center justify-center gap-3">
      {icon}
      <div className="text-3xl sm:text-4xl font-black text-gray-900">
        {value}
      </div>
    </div>
    <div className="text-sm sm:text-lg text-gray-600 font-semibold">
      {label}
    </div>
  </div>
);