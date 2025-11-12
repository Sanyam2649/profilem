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
    <section className="w-full bg-gradient-to-br from-slate-50 to-amber-50  p-8 border border-amber-100">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-3 px-6 py-3 bg-white rounded-2xl shadow-sm border border-amber-200 mb-4">
          <Award className="w-5 h-5 text-amber-600" />
          <span className="text-sm font-semibold text-gray-700">Professional Credentials</span>
        </div>
        <h2 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-amber-800 bg-clip-text text-transparent mb-4">
          Certifications
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Validated expertise and continuous learning through industry-recognized credentials
        </p>
      </div>

      {/* Certifications Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {parsedCertifications.map((cert, index) => {
          const IconComponent = getCertificationIcon(index);
          const formattedDate = formatDate(cert.date || '');
          
          return (
            <div key={index} className="group">
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-xl hover:border-amber-200 transition-all duration-500 h-full flex flex-col">
                
                {/* Certificate Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl flex items-center justify-center">
                    <IconComponent className="w-6 h-6 text-white" />
                  </div>
                  
                  {/* Issuer Badge */}
                  {cert.issuer && (
                    <div className="flex items-center gap-2 px-3 py-1 bg-gray-100 rounded-full">
                      <span className="text-sm font-medium text-gray-700">
                        {getIssuerLogo(cert.issuer)}
                      </span>
                      <span className="text-xs text-gray-600 max-w-[80px] truncate">
                        {cert.issuer}
                      </span>
                    </div>
                  )}
                </div>

                {/* Certificate Name */}
                <h3 className="text-lg font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-amber-700 transition-colors leading-tight">
                  {cert.name}
                </h3>

                {/* Certificate Details */}
                <div className="space-y-2 mb-4 flex-1">
                  {cert.issuer && (
                    <div className="flex items-center gap-2 text-gray-600">
                      <Shield className="w-4 h-4" />
                      <span className="text-sm">Issued by {cert.issuer}</span>
                    </div>
                  )}
                  
                  {formattedDate && (
                    <div className="flex items-center gap-2 text-gray-600">
                      <Calendar className="w-4 h-4" />
                      <span className="text-sm">Earned {formattedDate}</span>
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
                      className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-amber-50 text-amber-700 rounded-xl text-sm font-semibold hover:bg-amber-100 transition-colors group/link"
                    >
                      <span>Verify Credential</span>
                      <ExternalLink className="w-4 h-4 group-hover/link:translate-x-0.5 transition-transform" />
                    </a>
                  ) : (
                    <div className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-gray-50 text-gray-600 rounded-xl text-sm font-semibold">
                      <BadgeCheck className="w-4 h-4" />
                      <span>Verified</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Certifications Summary */}
      <div className="bg-white p-6 border border-gray-200 shadow-sm">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="space-y-2">
            <div className="flex items-center justify-center gap-2">
              <Award className="w-5 h-5 text-amber-600" />
              <div className="text-2xl font-bold text-gray-900">{certifications.length}</div>
            </div>
            <div className="text-sm text-gray-600">Total Certifications</div>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center justify-center gap-2">
              <Shield className="w-5 h-5 text-blue-600" />
              <div className="text-2xl font-bold text-gray-900">
                {Array.from(new Set(parsedCertifications.map(c => c.issuer))).filter(Boolean).length}
              </div>
            </div>
            <div className="text-sm text-gray-600">Issuing Organizations</div>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center justify-center gap-2">
              <Calendar className="w-5 h-5 text-green-600" />
              <div className="text-2xl font-bold text-gray-900">
                {new Set(parsedCertifications.map(c => c.date?.match(/\b(20\d{2})\b/)?.[0]).filter(Boolean)).size}
              </div>
            </div>
            <div className="text-sm text-gray-600">Active Years</div>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center justify-center gap-2">
              <ExternalLink className="w-5 h-5 text-purple-600" />
              <div className="text-2xl font-bold text-gray-900">
                {parsedCertifications.filter(c => c.url).length}
              </div>
            </div>
            <div className="text-sm text-gray-600">Verifiable</div>
          </div>
        </div>

        {/* Continuous Learning Message */}
        <div className="mt-6 pt-6 border-t border-gray-100 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-amber-50 to-orange-50 rounded-full border border-amber-200">
            <Zap className="w-4 h-4 text-amber-600" />
            <span className="text-sm font-medium text-amber-800">
              Continuously expanding expertise through certified learning
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CertificationsSection;