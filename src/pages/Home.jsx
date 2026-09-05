import { ArrowRight, Globe, Users, HeartHandshake } from 'lucide-react';
import { Link } from 'react-router-dom';
import homeImage from '../assets/images/homeimg.jpg';
import churches from '../data/churchData';
import ChurchCard from '../components/ChurchCard';

export default function Home() {
  return (
    <div className="px-4 py-6 mx-auto space-y-6 md:space-y-12 md:px-8 md:py-8 max-w-7xl">
      
      {/* ----------------------------------------------------------------------
          TOP SECTION: Hero and Stats Grid 
          ---------------------------------------------------------------------- */}
      <div className="grid grid-cols-1 gap-4 lg:gap-6 lg:grid-cols-3 lg:h-[500px]">
        {/* Left Side: Hero Section */}
        <div className="relative flex flex-col justify-end p-6 overflow-hidden text-white md:p-10 lg:col-span-2 rounded-3xl bg-[#0c1322] min-h-[400px] lg:min-h-0">
          <div 
            className="absolute inset-0 z-0 bg-center bg-cover opacity-100 brightness-50 desaturate"
            style={{ backgroundImage: `url(${homeImage})` }}
          ></div>
          <div className="absolute inset-0 z-10 bg-gradient-to-t from-[#0c1322] via-[#0c1322]/80 to-transparent"></div>
          <div className="relative z-20 max-w-2xl">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-[10px] sm:text-xs font-bold tracking-[0.2em] text-[#45b5aa] uppercase">
                Since 1923 • Island-Wide
              </span>
              <div className="h-px bg-[#45b5aa] w-8 sm:w-12"></div>
            </div>
            <h1 className="mb-4 text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl md:mb-6">
              United in Faith,<br />Rooted in Love.
            </h1>
            <p className="mb-6 text-base font-medium text-gray-200 sm:text-lg md:text-xl text-balance md:mb-8">
              The Apostolic Church Sri Lanka - spreading hope across the island through 100+ congregations in Sinhala, Tamil and English.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row md:gap-4">
              <Link to="/churches" className="flex items-center justify-center gap-2 px-6 py-3 text-sm font-medium transition-colors w-full sm:w-auto rounded-full text-white bg-[#368b9d] hover:bg-[#2a7384]">
                Find a church <ArrowRight className="w-4 h-4" />
              </Link>
              <Link to="/events" className="flex items-center justify-center px-6 py-3 text-sm font-medium text-white transition-colors w-full sm:w-auto border border-white/40 rounded-full hover:bg-white/10 hover:border-white">
                Upcoming events
              </Link>
            </div>
          </div>
        </div>

        {/* Right Side: Statistics Grid with Background Images */}
        <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:h-auto">
          {/* Box 1 */}
          <div className="relative flex flex-col items-center justify-center p-4 overflow-hidden text-white sm:p-6 rounded-3xl bg-[#2a7384] aspect-square lg:aspect-auto">
            <div className="absolute inset-0 z-0 bg-center bg-cover opacity-20 mix-blend-overlay" style={{ backgroundImage: "url('https://static.vecteezy.com/system/resources/thumbnails/046/908/133/small/believer-hands-worship-the-cross-photo.jpg')" }}></div>
            <span className="relative z-10 text-3xl font-bold sm:text-4xl xl:text-5xl">102</span>
            <span className="relative z-10 mt-1 text-[10px] font-bold tracking-widest text-center uppercase sm:text-xs sm:mt-2">Congregations</span>
          </div>
          {/* Box 2 */}
          <div className="relative flex flex-col items-center justify-center p-4 overflow-hidden text-white sm:p-6 rounded-3xl bg-[#368b9d] aspect-square lg:aspect-auto">
            <div className="absolute inset-0 z-0 bg-center bg-cover opacity-20 mix-blend-overlay" style={{ backgroundImage: "url('https://t3.ftcdn.net/jpg/01/84/04/36/360_F_184043604_Z0tCeR2ynlL5P94ln9mb6WFbZaqCDlIc.jpg')" }}></div>
            <span className="relative z-10 text-3xl font-bold sm:text-4xl xl:text-5xl">25</span>
            <span className="relative z-10 mt-1 text-[10px] font-bold tracking-widest text-center uppercase sm:text-xs sm:mt-2">Districts</span>
          </div>
          {/* Box 3 */}
          <div className="relative flex flex-col items-center justify-center p-4 overflow-hidden sm:p-6 rounded-3xl bg-[#88c5cc] text-[#0c1322] aspect-square lg:aspect-auto">
            <div className="absolute inset-0 z-0 bg-center bg-cover opacity-30 mix-blend-overlay" style={{ backgroundImage: "url('https://t4.ftcdn.net/jpg/09/01/00/29/360_F_901002966_QQeAtq0GJQohczOpM5WpKFK6orvsRFoA.jpg')" }}></div>
            <span className="relative z-10 text-3xl font-bold sm:text-4xl xl:text-5xl">09</span>
            <span className="relative z-10 mt-1 text-[10px] font-bold tracking-widest text-center uppercase sm:text-xs sm:mt-2">Provinces</span>
          </div>
          {/* Box 4 */}
          <div className="relative flex flex-col items-center justify-center p-4 overflow-hidden text-white sm:p-6 rounded-3xl bg-[#13233b] aspect-square lg:aspect-auto">
            <div className="absolute inset-0 z-0 bg-center bg-cover opacity-30 mix-blend-overlay" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1510590337019-5ef8d3d32116?q=80&w=800')" }}></div>
            <span className="relative z-10 text-3xl font-bold sm:text-4xl xl:text-5xl">02</span>
            <span className="relative z-10 mt-1 text-[10px] font-bold tracking-widest text-center uppercase sm:text-xs sm:mt-2">Languages</span>
          </div>
        </div>
      </div>

      {/* ----------------------------------------------------------------------
          MIDDLE SECTION: Legacy & Find a Church 
          ---------------------------------------------------------------------- */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 mt-12">
        
        {/* Left Side: Legacy of Grace */}
        <div className="flex flex-col p-8 bg-white border border-gray-100 lg:col-span-4 rounded-3xl shadow-sm">
          <span className="text-[10px] font-bold tracking-widest text-[#368b9d] uppercase mb-4">Welcome</span>
          <h2 className="text-3xl md:text-4xl font-bold text-[#0c1322] mb-4">A Legacy of Grace</h2>
          <p className="mb-8 leading-relaxed text-gray-500 text-sm md:text-base">
            From a small gathering in Colombo in 1923 to a national fellowship of 102 branches — each locally led, each open to everyone, all united in doctrine, prayer and mission.
          </p>
          <div className="grid grid-cols-3 gap-4 mb-10">
            <div className="flex flex-col items-start gap-2">
              <Globe className="w-5 h-5 text-[#368b9d]" />
              <span className="text-xs font-semibold text-[#0c1322]">Sinhala & Tamil languages</span>
            </div>
            <div className="flex flex-col items-start gap-2">
              <Users className="w-5 h-5 text-[#368b9d]" />
              <span className="text-xs font-semibold text-[#0c1322]">Every district</span>
            </div>
            <div className="flex flex-col items-start gap-2">
              <HeartHandshake className="w-5 h-5 text-[#368b9d]" />
              <span className="text-xs font-semibold text-[#0c1322]">Serving communities</span>
            </div>
          </div>
          <button className="px-6 py-3 mt-auto text-sm font-medium text-white rounded-full bg-[#0c1322] hover:bg-slate-800 w-max">
            Our story
          </button>
        </div>

        {/* Right Side: Find a Church Preview */}
        <div className="flex flex-col p-6 sm:p-8 bg-slate-50 lg:col-span-8 rounded-3xl border border-gray-100">
          <div className="flex items-end justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-[#0c1322]">Find a Church</h2>
              <p className="mt-1 text-sm text-gray-500">Locate a spiritual home near you</p>
            </div>
            <Link to="/churches" className="text-sm font-bold text-[#368b9d] hover:underline">
              All 102
            </Link>
          </div>
          
          <div className="flex gap-2 pb-2 mb-6 overflow-x-auto hide-scrollbar whitespace-nowrap">
            {['Colombo 12', 'Gampaha 9', 'Galle 5', 'Jaffna 5', 'Kalutara 5', 'Kandy 5', 'Ampara 4', 'Badulla 4'].map((filter) => (
              <span key={filter} className="px-4 py-1.5 text-xs font-semibold text-gray-600 bg-white border border-gray-200 rounded-full cursor-pointer hover:bg-gray-50">
                {filter}
              </span>
            ))}
          </div>

          {/* Sliced Dynamic Church Cards Grid */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {churches.slice(0, 6).map((church) => (
              <ChurchCard
                key={church.id}
                district={church.district}
                name={church.name}
                location={church.location}
                address={church.address}
                times={church.times}
              />
            ))}
          </div>
        </div>
      </div>

      {/* ----------------------------------------------------------------------
          BOTTOM SECTION: Worshipping Image, Plan Visit, Upcoming Events
          ---------------------------------------------------------------------- */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 mt-12">
        
        {/* Left Side Col (Images + Plan a Visit) */}
        <div className="flex flex-col gap-6 lg:col-span-4">
          {/* Worship Image */}
          <div 
            className="w-full bg-center bg-cover h-64 sm:h-72 rounded-3xl"
            style={{ backgroundImage: "url('https://images.unsplash.com/photo-1510590337019-5ef8d3d32116?q=80&w=1000')" }}
          ></div>
          
          {/* Planning a Visit Box */}
          <div className="flex flex-col p-8 bg-[#88c5cc] rounded-3xl text-[#0c1322]">
            <h2 className="mb-2 text-2xl font-bold">Planning a Visit?</h2>
            <p className="mb-8 text-sm font-medium opacity-80">
              Tell us where you are and we will save you a seat.
            </p>
            <button className="px-6 py-3 mt-auto text-sm font-medium text-white rounded-full bg-[#0c1322] hover:bg-slate-800 w-max">
              Plan your visit
            </button>
          </div>
        </div>

        {/* Right Side Col (Upcoming Events) */}
        <div className="flex flex-col p-6 sm:p-8 bg-[#368b9d] lg:col-span-8 rounded-3xl text-white">
          <div className="flex items-end justify-between mb-8">
            <h2 className="text-2xl font-bold md:text-3xl">Upcoming</h2>
            <Link to="/events" className="text-sm font-medium hover:underline opacity-90">
              Full calendar
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {[
              { date: 'AUG 21', title: 'Northern Region Youth Camp', loc: 'Bethel Apostolic Church, Jaffna' },
              { date: 'AUG 29', title: 'Island-wide Night of Prayer', loc: 'Simultaneous at every regional centre' },
              { date: 'SEPT 04', title: 'National Apostolic Convention', loc: 'Sugathadasa Indoor Stadium, Colombo' },
              { date: 'SEPT 17', title: 'Pastors & Leaders Training', loc: 'Apostolic Bible Institute, Kandy' }
            ].map((event, idx) => (
              <div key={idx} className="flex items-center gap-4 p-4 transition-colors border rounded-2xl border-white/20 bg-white/5 hover:bg-white/10">
                <div className="flex flex-col items-center justify-center w-14 h-14 bg-white/20 rounded-full shrink-0">
                  <span className="text-[10px] font-bold tracking-widest uppercase leading-none">{event.date.split(' ')[0]}</span>
                  <span className="text-lg font-bold leading-none mt-1">{event.date.split(' ')[1]}</span>
                </div>
                <div>
                  <h3 className="font-bold leading-tight text-sm md:text-base mb-1">{event.title}</h3>
                  <p className="text-xs opacity-80">{event.loc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
}