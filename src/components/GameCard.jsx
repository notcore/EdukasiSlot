import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom'; 

export default function GameCard({ title, imageSrc }) {
  return (
    <Link to="/auto" className="block">
      <motion.div 
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="relative w-full aspect-[3/4] rounded-3xl overflow-hidden cursor-pointer group border border-zinc-700 bg-zinc-900 shadow-xl"
      >
        <img 
          src={imageSrc} 
          alt={title} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full p-4">
          <h3 className="text-white font-black text-lg uppercase tracking-wider drop-shadow-lg">
            {title}
          </h3>
          <div className="w-10 h-1 bg-amber-500 mt-1 rounded-full" />
        </div>
        <div className="absolute inset-0 border-2 border-transparent group-hover:border-amber-500/50 rounded-3xl transition-colors duration-300" />
      </motion.div>
    </Link>
  );
}