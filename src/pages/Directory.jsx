import { useState } from 'react';
import { Search } from 'lucide-react';
import churches from '../data/HomeData';
import ChurchCard from '../components/ChurchCard';

export default function Directory() {
  // 1. State for Search and Dropdown Filters
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProvince, setSelectedProvince] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('');
  
  // State for Pagination/Load More
  const [visibleCount, setVisibleCount] = useState(12);

  // 2. Advanced Filtering Logic
  const filteredChurches = churches.filter((church) => {
    // Check Search Term
    const searchLower = searchTerm.toLowerCase();
    const matchesSearch = searchTerm === '' || (
      (church.name && church.name.toLowerCase().includes(searchLower)) ||
      (church.district && church.district.toLowerCase().includes(searchLower)) ||
      (church.address && church.address.toLowerCase().includes(searchLower))
    );

    // Check Province Dropdown (Assuming your data has a 'province' property)
    const matchesProvince = selectedProvince === '' || 
      (church.province && church.province.toLowerCase() === selectedProvince.toLowerCase());

    // Check District Dropdown
    const matchesDistrict = selectedDistrict === '' || 
      (church.district && church.district.toLowerCase() === selectedDistrict.toLowerCase());

    // Check Language Dropdown (Assuming your data has a 'language' string or 'languages' array)
    const matchesLanguage = selectedLanguage === '' || 
      (church.languages && church.languages.map(l => l.toLowerCase()).includes(selectedLanguage.toLowerCase())) ||
      (church.language && church.language.toLowerCase() === selectedLanguage.toLowerCase());

    // A church only shows up if it matches ALL active filters
    return matchesSearch && matchesProvince && matchesDistrict && matchesLanguage;
  });

  // 3. Slice the list for pagination
  const displayedChurches = filteredChurches.slice(0, visibleCount);

  const handleLoadMore = () => {
    setVisibleCount((prevCount) => prevCount + 8);
  };

  // 4. Reset all filters and search
  const handleReset = () => {
    setSearchTerm('');
    setSelectedProvince('');
    setSelectedDistrict('');
    setSelectedLanguage('');
    setVisibleCount(12);
  };

  return (
    <div className="px-4 py-12 mx-auto space-y-8 md:py-16 md:px-8 max-w-7xl">
      
      {/* HEADER SECTION */}
      <div className="max-w-2xl">
        <span className="text-[10px] font-bold tracking-widest text-brand-teal uppercase mb-2 block text-[#368b9d]">
          Directory
        </span>
        <h1 className="mb-4 text-3xl font-bold md:text-5xl text-[#0c1322]">
          Find a church near you
        </h1>
        <p className="text-base text-gray-500 md:text-lg">
          102 congregations across 9 provinces and 25 districts. Search by town, district or the language you worship in.
        </p>
      </div>

      {/* SEARCH & FILTER BAR */}
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-4 md:flex-row">
          
          {/* Functional Search Input */}
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
              <Search className="w-4 h-4 text-gray-400" />
            </div>
            <input 
              type="text" 
              placeholder="Search town, district or pastor..." 
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setVisibleCount(12); // Reset count when searching
              }}
              className="w-full py-3 pl-10 pr-4 text-sm text-gray-900 bg-white border border-gray-200 rounded-lg outline-none focus:border-[#368b9d] focus:ring-1 focus:ring-[#368b9d] transition-all"
            />
          </div>

          {/* Functional Filters (Select Dropdowns) */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 md:w-1/2 lg:w-2/5">
            
            <select 
              value={selectedProvince}
              onChange={(e) => {
                setSelectedProvince(e.target.value);
                setVisibleCount(12);
              }}
              className="w-full py-3 pl-4 pr-8 text-sm text-gray-700 bg-white border border-gray-200 rounded-lg outline-none appearance-none cursor-pointer focus:border-[#368b9d] focus:ring-1 focus:ring-[#368b9d]"
            >
              <option value="">All provinces</option>
              <option value="Western">Western</option>
              <option value="Central">Central</option>
              <option value="Northern">Northern</option>
              <option value="Eastern">Eastern</option>
              <option value="Southern">Southern</option>
            </select>
            
            <select 
              value={selectedDistrict}
              onChange={(e) => {
                setSelectedDistrict(e.target.value);
                setVisibleCount(12);
              }}
              className="w-full py-3 pl-4 pr-8 text-sm text-gray-700 bg-white border border-gray-200 rounded-lg outline-none appearance-none cursor-pointer focus:border-[#368b9d] focus:ring-1 focus:ring-[#368b9d]"
            >
              <option value="">All districts</option>
              <option value="Colombo">Colombo</option>
              <option value="Gampaha">Gampaha</option>
              <option value="Kandy">Kandy</option>
              <option value="Jaffna">Jaffna</option>
              <option value="Nuwara Eliya">Nuwara Eliya</option>
            </select>
            
            <select 
              value={selectedLanguage}
              onChange={(e) => {
                setSelectedLanguage(e.target.value);
                setVisibleCount(12);
              }}
              className="w-full py-3 pl-4 pr-8 text-sm text-gray-700 bg-white border border-gray-200 rounded-lg outline-none appearance-none cursor-pointer focus:border-[#368b9d] focus:ring-1 focus:ring-[#368b9d]"
            >
              <option value="">All languages</option>
              <option value="Sinhala">Sinhala</option>
              <option value="Tamil">Tamil</option>
              <option value="English">English</option>
            </select>
            
          </div>
        </div>

        {/* Results Count & Reset */}
        <div className="flex items-center justify-between py-2 text-xs text-gray-500 border-b border-gray-200">
          <span>Showing {displayedChurches.length} of {filteredChurches.length} churches</span>
          <button 
            onClick={handleReset}
            className="font-medium text-gray-700 transition-colors hover:text-[#0c1322] hover:underline"
          >
            Reset filters
          </button>
        </div>
      </div>

      {/* CHURCH RESULTS GRID */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 lg:gap-6">
        {displayedChurches.length > 0 ? (
          displayedChurches.map((church) => (
            <ChurchCard
              key={church.id}
              district={church.district}
              name={church.name}
              location={church.location}
              address={church.address}
              times={church.times}
            />
          ))
        ) : (
          <div className="py-12 text-center text-gray-500 col-span-full">
            No churches found matching your filters.
          </div>
        )}
      </div>

      {/* LOAD MORE BUTTON */}
      {visibleCount < filteredChurches.length && (
        <div className="flex justify-center pt-8">
          <button 
            onClick={handleLoadMore}
            className="px-8 py-3 text-sm font-medium text-[#0c1322] transition-colors bg-transparent border-2 border-gray-200 rounded-full hover:border-[#0c1322] hover:bg-gray-50"
          >
            Load more churches
          </button>
        </div>
      )}

    </div>
  );
}