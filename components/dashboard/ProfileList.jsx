import {useState } from 'react';
import { Edit3, Trash2, ChevronLeft, ChevronRight, Eye, Share2, X, Copy, Check, Mail } from 'lucide-react';

const PortfolioModal = ({ isOpen, onClose, profile }) => {
  const [copied, setCopied] = useState(false);
  const portfolioUrl = profile?._id ? `${window.location.origin}/${profile._id}` : '';

  const handleCopyLink = async () => {
    if (portfolioUrl) {
      await navigator.clipboard.writeText(portfolioUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleShare = async (platform) => {
    const text = `Check out ${profile?.name || 'this amazing'} portfolio!`;
    
    const urls = {
      twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(portfolioUrl)}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(portfolioUrl)}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(portfolioUrl)}`,
      whatsapp: `https://wa.me/?text=${encodeURIComponent(text + ' ' + portfolioUrl)}`
    };

    if (urls[platform]) {
      window.open(urls[platform], '_blank', 'width=600,height=400');
    }
  };

  if (!isOpen || !profile) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-lg">
      <div className="bg-gradient-to-br from-white to-blue-50 rounded-3xl shadow-2xl w-full max-w-md mx-4 border border-blue-200">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-blue-200 bg-gradient-to-r from-blue-600 to-purple-600 rounded-t-3xl">
          <h3 className="text-lg font-bold text-white">
            Portfolio Options
          </h3>
          <button
            onClick={onClose}
            className="btn btn-ghost btn-sm btn-circle hover:bg-white/20 text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Profile Info */}
          <div className="flex items-center gap-4">
            <div className="avatar placeholder">
             <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-orange-500 rounded-2xl flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-sm">
                  {profile.personal.name?.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2) || 'P'}
                </span>
              </div>
            </div>
            <div>
              <h4 className="font-bold text-gray-800 text-lg">
                {profile.personal.name || 'Unnamed Profile'}
              </h4>
              <p className="text-sm text-gray-600">
                {profile.personal.email || 'No email'}
              </p>
            </div>
          </div>

          {/* Portfolio URL */}
          <div className="space-y-2">
            <label className="label">
              <span className="label-text font-semibold text-gray-700">Portfolio URL</span>
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={portfolioUrl}
                readOnly
                className="input input-bordered flex-1 text-sm bg-white border-2 border-blue-200 focus:border-blue-500 text-gray-800 font-medium"
              />
              <button
                onClick={handleCopyLink}
                className="btn bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white border-0 btn-square"
                title="Copy link"
              >
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <button
              onClick={() => {
                window.open(portfolioUrl, '_blank');
                onClose();
              }}
              className="btn bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-0 w-full gap-2 shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200"
            >
              <Eye className="w-5 h-5" />
              View Portfolio
            </button>

            <div className="border-t border-blue-200 pt-4">
  <label className="label">
    <span className="label-text font-semibold text-gray-700">Share on Social Media</span>
  </label>
  <div className="grid grid-cols-2 gap-3">
    <button
      onClick={() => handleShare('twitter')}
      className="btn bg-gradient-to-r from-blue-400 to-blue-500 hover:from-blue-500 hover:to-blue-600 text-white border-0 gap-2 shadow-md hover:shadow-lg transform hover:-translate-y-1 transition-all duration-200"
    >
      <span className="font-bold text-lg">𝕏</span>
      Twitter
    </button>
    
    <button
      onClick={() => handleShare('linkedin')}
      className="btn bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white border-0 gap-2 shadow-md hover:shadow-lg transform hover:-translate-y-1 transition-all duration-200"
    >
      <svg className="w-5 h-5" viewBox="0 -2 44 44" version="1.1" xmlns="http://www.w3.org/2000/svg" fill="currentColor">
        <g id="Icons" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
          <g id="Color-" transform="translate(-702.000000, -265.000000)" fill="currentColor">
            <path d="M746,305 L736.2754,305 L736.2754,290.9384 C736.2754,287.257796 734.754233,284.74515 731.409219,284.74515 C728.850659,284.74515 727.427799,286.440738 726.765522,288.074854 C726.517168,288.661395 726.555974,289.478453 726.555974,290.295511 L726.555974,305 L716.921919,305 C716.921919,305 717.046096,280.091247 716.921919,277.827047 L726.555974,277.827047 L726.555974,282.091631 C727.125118,280.226996 730.203669,277.565794 735.116416,277.565794 C741.21143,277.565794 746,281.474355 746,289.890824 L746,305 L746,305 Z M707.17921,274.428187 L707.117121,274.428187 C704.0127,274.428187 702,272.350964 702,269.717936 C702,267.033681 704.072201,265 707.238711,265 C710.402634,265 712.348071,267.028559 712.41016,269.710252 C712.41016,272.34328 710.402634,274.428187 707.17921,274.428187 L707.17921,274.428187 L707.17921,274.428187 Z M703.109831,277.827047 L711.685795,277.827047 L711.685795,305 L703.109831,305 L703.109831,277.827047 L703.109831,277.827047 Z" id="LinkedIn"></path>
          </g>
        </g>
      </svg>
      LinkedIn
    </button>
    
    <button
      onClick={() => handleShare('facebook')}
      className="btn bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white border-0 gap-2 shadow-md hover:shadow-lg transform hover:-translate-y-1 transition-all duration-200"
    >
      <svg className="w-5 h-5" viewBox="0 0 48 48" version="1.1" xmlns="http://www.w3.org/2000/svg" fill="currentColor">
        <g id="Icons" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
          <g id="Color-" transform="translate(-200.000000, -160.000000)" fill="currentColor">
            <path d="M225.638355,208 L202.649232,208 C201.185673,208 200,206.813592 200,205.350603 L200,162.649211 C200,161.18585 201.185859,160 202.649232,160 L245.350955,160 C246.813955,160 248,161.18585 248,162.649211 L248,205.350603 C248,206.813778 246.813769,208 245.350955,208 L233.119305,208 L233.119305,189.411755 L239.358521,189.411755 L240.292755,182.167586 L233.119305,182.167586 L233.119305,177.542641 C233.119305,175.445287 233.701712,174.01601 236.70929,174.01601 L240.545311,174.014333 L240.545311,167.535091 C239.881886,167.446808 237.604784,167.24957 234.955552,167.24957 C229.424834,167.24957 225.638355,170.625526 225.638355,176.825209 L225.638355,182.167586 L219.383122,182.167586 L219.383122,189.411755 L225.638355,189.411755 L225.638355,208 L225.638355,208 Z" id="Facebook"></path>
          </g>
        </g>
      </svg>
      Facebook
    </button>
    
    <button
      onClick={() => handleShare('whatsapp')}
      className="btn bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white border-0 gap-2 shadow-md hover:shadow-lg transform hover:-translate-y-1 transition-all duration-200"
    >
      <svg className="w-5 h-5" viewBox="0 0 48 48" version="1.1" xmlns="http://www.w3.org/2000/svg" fill="currentColor">
        <g id="Icons" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
          <g id="Color-" transform="translate(-700.000000, -360.000000)" fill="currentColor">
            <path d="M723.993033,360 C710.762252,360 700,370.765287 700,383.999801 C700,389.248451 701.692661,394.116025 704.570026,398.066947 L701.579605,406.983798 L710.804449,404.035539 C714.598605,406.546975 719.126434,408 724.006967,408 C737.237748,408 748,397.234315 748,384.000199 C748,370.765685 737.237748,360.000398 724.006967,360.000398 L723.993033,360.000398 L723.993033,360 Z M717.29285,372.190836 C716.827488,371.07628 716.474784,371.034071 715.769774,371.005401 C715.529728,370.991464 715.262214,370.977527 714.96564,370.977527 C714.04845,370.977527 713.089462,371.245514 712.511043,371.838033 C711.806033,372.557577 710.056843,374.23638 710.056843,377.679202 C710.056843,381.122023 712.567571,384.451756 712.905944,384.917648 C713.258648,385.382743 717.800808,392.55031 724.853297,395.471492 C730.368379,397.757149 732.00491,397.545307 733.260074,397.27732 C735.093658,396.882308 737.393002,395.527239 737.971421,393.891043 C738.54984,392.25405 738.54984,390.857171 738.380255,390.560912 C738.211068,390.264652 737.745308,390.095816 737.040298,389.742615 C736.335288,389.389811 732.90737,387.696673 732.25849,387.470894 C731.623543,387.231179 731.017259,387.315995 730.537963,387.99333 C729.860819,388.938653 729.198006,389.89831 728.661785,390.476494 C728.238619,390.928051 727.547144,390.984595 726.969123,390.744481 C726.193254,390.420348 724.021298,389.657798 721.340985,387.273388 C719.267356,385.42535 717.856938,383.125756 717.448104,382.434484 C717.038871,381.729275 717.405907,381.319529 717.729948,380.938852 C718.082653,380.501232 718.421026,380.191036 718.77373,379.781688 C719.126434,379.372738 719.323884,379.160897 719.549599,378.681068 C719.789645,378.215575 719.62006,377.735746 719.450874,377.382942 C719.281687,377.030139 717.871269,373.587317 717.29285,372.190836 Z" id="Whatsapp"></path>
          </g>
        </g>
      </svg>
      WhatsApp
    </button>
  </div>
</div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ProfileList = ({ 
  profiles, 
  onEdit, 
  onDelete, 
  isLoading = false 
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const itemsPerPage = 10;
 const filteredProfiles = profiles;

  // Pagination
  const totalPages = Math.ceil(filteredProfiles.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentProfiles = filteredProfiles.slice(startIndex, startIndex + itemsPerPage);

  const handlePortfolioAction = (profile) => {
    setSelectedProfile(profile);
    setIsModalOpen(true);
  };

  if (isLoading) {
    return (
      <div className="card bg-gradient-to-br from-white to-blue-50 shadow-2xl border-2 border-blue-200 rounded-3xl">
        <div className="card-body">
          <div className="overflow-x-auto">
            <table className="table w-full">
              <thead>
                <tr className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">
                  <th className="w-12 text-center rounded-tl-2xl">#</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Location</th>
                  <th>Experience</th>
                  <th>Education</th>
                  <th className="w-32 text-center rounded-tr-2xl">Actions</th>
                </tr>
              </thead>
              <tbody>
                {[1, 2, 3, 4, 5].map((i) => (
                  <tr key={i} className="hover:bg-blue-50 transition-colors">
                    <td><div className="h-4 bg-gradient-to-r from-blue-200 to-purple-200 rounded w-8 animate-pulse mx-auto"></div></td>
                    <td><div className="h-4 bg-gradient-to-r from-blue-200 to-purple-200 rounded w-32 animate-pulse"></div></td>
                    <td><div className="h-4 bg-gradient-to-r from-blue-200 to-purple-200 rounded w-40 animate-pulse"></div></td>
                    <td><div className="h-4 bg-gradient-to-r from-blue-200 to-purple-200 rounded w-24 animate-pulse"></div></td>
                    <td><div className="h-4 bg-gradient-to-r from-blue-200 to-purple-200 rounded w-16 animate-pulse"></div></td>
                    <td><div className="h-4 bg-gradient-to-r from-blue-200 to-purple-200 rounded w-16 animate-pulse"></div></td>
                    <td><div className="h-8 bg-gradient-to-r from-blue-200 to-purple-200 rounded animate-pulse"></div></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
  
  return (
   (profiles.length > 0 &&  <>
      <div className="space-y-6">
        {/* Table */}
        <div className="card bg-gradient-to-br from-white to-blue-50 text-gray-800 shadow-2xl border-2 border-blue-200 rounded-3xl overflow-hidden">
          <div className="card-body p-0">
            <div className="overflow-x-auto">
              <table className="table w-full border-separate table-auto">
                <thead>
                  <tr className="bg-gradient-to-r from-blue-500 to-purple-500 text-white text-sm font-bold">
                    <th className="w-12 text-center py-4 rounded-tl-3xl justify-center">#</th>
                    <th className="py-4">Profile</th>
                    <th className="py-4">Email</th>
                    <th className="text-center py-4">Experience</th>
                    <th className="text-center py-4">Education</th>
                    <th className="w-48 text-center py-4 rounded-tr-3xl">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {currentProfiles.map((profile, index) => (
                    <tr key={profile._id || profile.personal.email} className="hover:bg-blue-50/80 transition-all duration-200 border-b border-blue-100 last:border-b-0">
                      <td className="text-center font-bold text-blue-600 py-4">
                        {startIndex + index + 1}
                      </td>
                      <td className="py-4">
                        <div className="flex items-center gap-4">
                          <div className="avatar placeholder">
                           <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-orange-500 rounded-2xl flex items-center justify-center shadow-lg">
                              <span className="text-white font-bold text-sm">
                                {profile?.personal?.name?.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2) || 'P'}
                              </span>
                            </div>
                          </div>
                          <div>
                            <div className="font-bold text-gray-800 text-lg">
                              {profile?.personal.name || 'Unnamed Profile'}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="py-4">
                        <div className="space-y-2">
                          {profile?.personal?.email && (
                            <div className="flex items-center gap-2 text-gray-700 font-medium">
                              <Mail className="w-4 h-4 text-blue-500" />
                              {profile.personal.email}
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="text-center font-semibold text-gray-700 py-4">
                          {profile?.experience?.[0]?.position || 'Not specified'}
                      </td>
                      <td className="text-center font-semibold text-gray-700 py-4">
                          {profile?.education?.[0]?.degree || 'Not specified'}
                      </td>
                      <td className="py-4">
                        <div className="flex justify-center gap-2">
                          <button
                            onClick={() => handlePortfolioAction(profile)}
                            className="btn bg-gradient-to-r from-blue-400 to-blue-500 hover:from-blue-500 hover:to-blue-600 text-white border-0 btn-sm gap-1 shadow-md hover:shadow-lg transform hover:-translate-y-1 transition-all duration-200"
                            title="Portfolio Options"
                            disabled={!profile._id}
                          >
                            <Share2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => onEdit(profile)}
                            className="btn bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white border-0 btn-sm shadow-md hover:shadow-lg transform hover:-translate-y-1 transition-all duration-200"
                            title="Edit Profile"
                          >
                            <Edit3 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => profile._id && onDelete(profile?._id)}
                            className="btn bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white border-0 btn-sm shadow-md hover:shadow-lg transform hover:-translate-y-1 transition-all duration-200"
                            title="Delete Profile"
                            disabled={!profile._id}
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-blue-200">
            <div className="text-sm font-semibold text-gray-700 bg-blue-50 px-4 py-2 rounded-2xl border border-blue-200">
              Showing {startIndex + 1}-{Math.min(startIndex + itemsPerPage, filteredProfiles.length)} of {filteredProfiles.length} profiles
            </div>
            
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="btn bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white border-0 btn-sm gap-2 shadow-md hover:shadow-lg disabled:from-gray-400 disabled:to-gray-500 disabled:hover:from-gray-400 disabled:hover:to-gray-500 transform hover:-translate-y-1 transition-all duration-200"
              >
                <ChevronLeft className="w-4 h-4" />
                Previous
              </button>
              
              <div className="flex items-center gap-1 flex-wrap justify-center">
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  let pageNum;
                  if (totalPages <= 5) {
                    pageNum = i + 1;
                  } else if (currentPage <= 3) {
                    pageNum = i + 1;
                  } else if (currentPage >= totalPages - 2) {
                    pageNum = totalPages - 4 + i;
                  } else {
                    pageNum = currentPage - 2 + i;
                  }
                  
                  return (
                    <button
                      key={pageNum}
                      onClick={() => setCurrentPage(pageNum)}
                      className={`btn btn-sm min-w-10 font-bold ${
                        currentPage === pageNum 
                          ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white border-0 shadow-lg' 
                          : 'bg-gradient-to-r from-blue-100 to-purple-100 text-gray-700 border border-blue-200 hover:from-blue-200 hover:to-purple-200 shadow-md hover:shadow-lg transform hover:-translate-y-1 transition-all duration-200'
                      }`}
                    >
                      {pageNum}
                    </button>
                  );
                })}
              </div>
              
              <button
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="btn bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white border-0 btn-sm gap-2 shadow-md hover:shadow-lg disabled:from-gray-400 disabled:to-gray-500 disabled:hover:from-gray-400 disabled:hover:to-gray-500 transform hover:-translate-y-1 transition-all duration-200"
              >
                Next
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Portfolio Modal */}
      <PortfolioModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedProfile(null);
        }}
        profile={selectedProfile}
      />
    </>)
  );
};

export default ProfileList;