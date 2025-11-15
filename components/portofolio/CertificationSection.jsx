import {
  Award,
  Calendar,
  ExternalLink,
  Shield,
} from "lucide-react";

export default function CertificationsSection({ certifications }) {
  const formatDate = (d) => {
    if (!d) return "N/A";
    const date = new Date(d);
    return date.toLocaleDateString("en-US", {
      month: "short",
      year: "numeric",
    });
  };

  return (
    <section className="w-full py-20">
      <div className="max-w-7xl mx-auto px-6">

        {/* HEADER */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-3 px-5 py-2.5 bg-white shadow-sm border rounded-xl">
            <Award className="w-5 h-5 text-indigo-600" />
            <span className="text-sm font-semibold text-gray-700">
              Verified Credentials
            </span>
          </div>

          <h2 className="mt-6 text-4xl sm:text-5xl font-extrabold text-gray-900 tracking-tight">
            Certifications
          </h2>

          <p className="mt-4 text-gray-600 text-lg max-w-2xl mx-auto">
            Credentials from recognized authorities — showcased with a formal certificate aesthetic.
          </p>
        </div>

        {/* HORIZONTAL SCROLL */}
        <div
          className="
            flex gap-6 overflow-x-auto scrollbar-none snap-x snap-mandatory
            pb-4
          "
        >
          {certifications.map((cert) => (
            <div
              key={cert._id}
              className="
                snap-center flex-shrink-0
                w-[90%] sm:w-[70%] lg:w-[40%]
              "
            >
              <div
                className="
                  bg-[#faf9f6]
                  rounded-2xl
                  p-8
                  border border-[#d8d3c3]
                  shadow-[0_0_20px_rgba(0,0,0,0.05)]
                  hover:shadow-[0_0_25px_rgba(0,0,0,0.15)]
                  transition-all
                "
                style={{
                  backgroundImage:
                    "url('https://www.transparenttextures.com/patterns/white-paper.png')",
                }}
              >
                {/* HEADER */}
                <div className="flex justify-between items-start mb-6">
                  <div className="
                    w-14 h-14 rounded-xl
                    bg-gradient-to-br from-indigo-600 to-indigo-800
                    flex items-center justify-center text-white shadow-md
                  ">
                    <Award className="w-7 h-7" />
                  </div>

                  <span className="
                    text-xs font-semibold 
                    px-3 py-1 
                    rounded-full 
                    bg-indigo-50 
                    border border-indigo-200
                    text-indigo-700
                  ">
                    {cert.issuer}
                  </span>
                </div>

                {/* TITLE */}
                <h3 className="text-xl font-bold text-gray-900 leading-snug mb-3">
                  {cert.name}
                </h3>

                {/* DETAILS */}
                <div className="space-y-2 text-sm text-gray-700">
                  <div className="flex items-center gap-2">
                    <Shield className="w-4 h-4 text-indigo-700" />
                    <span>{cert.issuer}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-indigo-700" />
                    <span>Issued {formatDate(cert.issueDate)}</span>
                  </div>
                </div>

                {/* ACTION */}
                <div className="mt-6 pt-4 border-t border-[#e2ddd0]">
                  {cert.link ? (
                    <a
                      href={cert.link}
                      target="_blank"
                      className="
                        flex justify-center items-center gap-2 
                        px-4 py-2 
                        rounded-xl 
                        bg-indigo-600 text-white 
                        font-semibold
                        text-sm
                        hover:bg-indigo-700
                        transition
                      "
                    >
                      Verify Certificate
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  ) : (
                    <p className="text-center text-gray-500 text-sm">
                      Verified Credential
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
