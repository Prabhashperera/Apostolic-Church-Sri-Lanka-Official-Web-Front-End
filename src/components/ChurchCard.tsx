import { Clock, MapPin } from 'lucide-react';

function ChurchCard(props: any) {
  return (
    <div className="p-5 bg-white border border-gray-100 shadow-sm rounded-2xl">
      
      <span className="text-[10px] font-bold tracking-widest text-[#368b9d] uppercase">
        {props.district}
      </span>

      <h3 className="mt-1 mb-3 text-base font-bold leading-tight text-[#0c1322]">
        {props.name} – {props.location}
      </h3>

      <div className="flex flex-col gap-2 text-xs text-gray-500">
        
        <div className="flex items-start gap-2">
          <MapPin className="w-3.5 h-3.5 mt-0.5 shrink-0" />
          {props.address}
        </div>

        <div className="flex items-center gap-2">
          <Clock className="w-3.5 h-3.5 shrink-0" />
          {props.times}
        </div>

      </div>
    </div>
  );
}

export default ChurchCard;