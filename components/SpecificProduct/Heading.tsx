const Heading = ({ category, title }: { category: string; title: string }) => {
  return (
    <div className="bg-white/90 backdrop-blur-md p-8 rounded-[3rem] border border-slate-100 shadow-sm">
      <span className="px-4 py-1 rounded-full bg-[#DC8916] text-white text-[10px] font-black uppercase tracking-widest">
        {category}
      </span>
      <h1 className="text-5xl md:text-6xl font-black text-slate-900 mt-6 italic uppercase tracking-tighter">
        {title}
      </h1>
    </div>
  );
};

export default Heading;
