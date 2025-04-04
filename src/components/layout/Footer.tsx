import { FaFacebook, FaTwitter, FaLinkedin } from "react-icons/fa"; // Import social media icons

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white text-center p-6 sm:p-8">
      {/* Footer Text */}
      <p className="text-sm sm:text-base">
        © {new Date().getFullYear()} Helpert. All rights reserved.
      </p>

      {/* Navigation Links */}
      <nav className="flex flex-wrap justify-center gap-4 mt-4 sm:mt-6">
        <a href="/privacy" className="hover:underline text-sm sm:text-base" aria-label="Privacy Policy">
          Privacy Policy
        </a>
        <a href="/terms" className="hover:underline text-sm sm:text-base" aria-label="Terms of Service">
          Terms of Service
        </a>
        <a href="/contact" className="hover:underline text-sm sm:text-base" aria-label="Contact Us">
          Contact Us
        </a>
      </nav>

      {/* Social Media Icons */}
      <div className="flex justify-center gap-6 mt-6 sm:mt-8">
        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
          <FaFacebook className="text-xl sm:text-2xl hover:text-blue-500" />
        </a>
        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
          <FaTwitter className="text-xl sm:text-2xl hover:text-blue-400" />
        </a>
        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
          <FaLinkedin className="text-xl sm:text-2xl hover:text-blue-600" />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
