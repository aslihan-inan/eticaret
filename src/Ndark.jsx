
export default function Topbar() {
  return (
    <div className="bg-gray-900 text-gray-200 text-sm px-4 py-2 flex flex-col md:flex-row justify-between items-center gap-3">
      
      {/* Telefon ve Email */}
      <div className="flex flex-col sm:flex-row items-center gap-1 sm:gap-6">
        <div className="flex items-center gap-1">
          <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 5h18M3 12h18M3 19h18" />
          </svg>
          <span className="font-semibold">(225) 555-0118</span>
        </div>
        <div className="flex items-center gap-1">
          <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M16 12l-4-4-4 4m8 0v6a2 2 0 01-2 2H8a2 2 0 01-2-2v-6" />
          </svg>
          <span className="font-semibold whitespace-nowrap">michelle.rivera@example.com</span>
        </div>
      </div>

      {/* Ortadaki yazı */}
      <div className="text-center md:text-left text-gray-300 font-semibold">
        Follow Us and get a chance to win 80% off
      </div>

      {/* Sosyal Medya */}
      <div className="flex items-center gap-3 text-gray-300 font-semibold">
        <span className="whitespace-nowrap">Follow Us :</span>

        {[
          {
            href: "#",
            label: "Instagram",
            path: "M7 2C4.243 2 2 4.243 2 7v10c0 2.757 2.243 5 5 5h10c2.757 0 5-2.243 5-5V7c0-2.757-2.243-5-5-5H7zm10 2a1 1 0 110 2 1 1 0 010-2zM12 7a5 5 0 100 10 5 5 0 000-10zm0 2a3 3 0 110 6 3 3 0 010-6z"
          },
          {
            href: "#",
            label: "YouTube",
            path: "M19.615 3.184a3.12 3.12 0 00-2.197-.87C14.822 2 12 2 12 2s-2.822 0-5.418.314a3.12 3.12 0 00-2.197.87A3.46 3.46 0 004 5.8 36.108 36.108 0 004 12a36.108 36.108 0 000 6.2 3.46 3.46 0 00.385 1.7 3.12 3.12 0 002.197.87C9.178 22 12 22 12 22s2.822 0 5.418-.314a3.12 3.12 0 002.197-.87 3.46 3.46 0 00.385-1.7A36.108 36.108 0 0020 12a36.108 36.108 0 00-.385-6.2 3.46 3.46 0 00-.885-1.616zM10 15.5v-7l6 3.5-6 3.5z"
          },
          {
            href: "#",
            label: "Facebook",
            path: "M22 12c0-5.522-4.477-10-10-10S2 6.478 2 12c0 4.991 3.657 9.128 8.438 9.879v-6.987h-2.54v-2.89h2.54V9.845c0-2.507 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.465h-1.26c-1.243 0-1.63.772-1.63 1.562v1.875h2.773l-.443 2.89h-2.33v6.987C18.343 21.128 22 16.991 22 12z"
          },
          {
            href: "#",
            label: "Twitter",
            path: "M23 3a10.9 10.9 0 01-3.14.86A4.48 4.48 0 0022.4.36a9.72 9.72 0 01-3.13 1.2 4.52 4.52 0 00-7.7 4.12 12.83 12.83 0 01-9.3-4.72 4.52 4.52 0 001.4 6.04 4.45 4.45 0 01-2.05-.57v.06a4.52 4.52 0 003.63 4.42 4.54 4.54 0 01-2.04.08 4.52 4.52 0 004.22 3.12 9.06 9.06 0 01-5.6 1.93A8.79 8.79 0 012 18.58a12.82 12.82 0 006.92 2.03c8.3 0 12.85-6.87 12.85-12.84 0-.2 0-.42-.02-.63A9.22 9.22 0 0023 3z"
          }
        ].map(({ href, label, path }) => (
          <a href={href} key={label} aria-label={label} className="hover:text-white">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d={path} />
            </svg>
          </a>
        ))}
      </div>
    </div>
  );
}
