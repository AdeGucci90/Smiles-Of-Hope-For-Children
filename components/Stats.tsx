
import React from 'react';
import { STATS } from '../constants';

const Stats: React.FC = () => {
  return (
    <div className="py-20 bg-[#EBF6FC]">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {STATS.map((stat, idx) => (
            <div 
              key={idx} 
              className="bg-white p-8 rounded-3xl shadow-sm border border-[#4FA3D1]/10 flex flex-col items-center text-center hover:shadow-xl hover:-translate-y-2 transition-all group"
            >
              <div className="mb-4 transform group-hover:scale-125 transition-transform">
                {stat.icon}
              </div>
              <h3 className="text-4xl font-bold text-[#4FA3D1] mb-2">{stat.value}</h3>
              <p className="text-[#4FA3D1] font-bold uppercase tracking-wider text-xs">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Stats;
