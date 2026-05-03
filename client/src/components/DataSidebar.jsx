import React from "react";
import { Link, useLocation } from "react-router-dom";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoClose } from "react-icons/io5";

const DataSidebar = ({ isOpen, onToggle }) => {
  const location = useLocation();
  const activeId = location.hash.replace('#', '') || '';
  const sections = [
    { id: "apiname", label: "API Name" },
    { id: "group", label: "Group/Class" },
    { id: "chemicalstructure", label: "Chemical Structure" },
    { id: "modeofaction", label: "Mechanism of Action" },
    { id: "useofdrug", label: "Use of Drug" },
    { id: "toxoofdrug", label: "Toxophore" },
    { id: "typeoftoxicity", label: "Type of Toxicity" },
    { id: "reasonoftoxicity", label: "Reason of Toxicity" },
    { id: "minconcentration", label: "Min Concentration" },
    { id: "successrate", label: "Response Rate" },
    { id: "currentstatus", label: "Clinical Efficacy" },
    { id: "adrs", label: "ADRs" },
  ];

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        onClick={onToggle}
        className="fixed md:hidden top-20 left-4 z-40 bg-green-600 text-white p-2 rounded-lg shadow-lg hover:bg-green-700 transition-all"
      >
        {isOpen ? <IoClose size={24} /> : <RxHamburgerMenu size={24} />}
      </button>

      {/* Sidebar */}
      <div
        className={`fixed md:static inset-y-0 left-0 z-30 w-64 bg-white dark:bg-green-950 shadow-xl transform md:translate-x-0 transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 overflow-y-auto`}
      >
        <div className="p-6">
          <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-6 border-b pb-4">
            Drug Details
          </h2>
          <nav className="space-y-2">
            {sections.map((section) => (
              <Link
                key={section.id}
                to={`#${section.id}`}
                className={`block py-2 px-4 rounded-lg transition-all duration-200 font-medium ${
                  activeId === section.id
                    ? 'bg-green-600 text-white shadow-md'
                    : 'text-gray-700 dark:text-gray-200 hover:bg-green-100 dark:hover:bg-green-800 hover:text-green-700'
                }`}
                onClick={() => {
                  // Close mobile sidebar on click
                  if (isOpen) onToggle();
                  window.scrollTo({ top: 0, behavior: 'smooth' }); // Ensure top then hash scroll
                }}
              >
                {section.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>

      {/* Mobile Overlay */}
      {isOpen && (
        <div
          onClick={onToggle}
        />
      )}
    </>
  );
};

export default DataSidebar;
