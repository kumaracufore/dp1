import React from "react";

interface ProjectCardProps {
  title: string;
  category: string;
  image: string;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  title,
  category,
  image,
}) => {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group cursor-pointer">
      <div className="h-64 overflow-hidden relative">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#3B5998]/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
          <div className="p-6">
            <span className="text-[#FFE17B] text-sm font-medium tracking-wider">
              {category}
            </span>
            <h3 className="text-white text-xl font-bold mt-1">{title}</h3>
          </div>
        </div>
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold text-[#3B5998] group-hover:text-[#FF8936] transition-colors duration-300">
          {title}
        </h3>
        <p className="text-[#3c2a1a] mt-2">
          A unique design solution blending ancient aesthetics with modern
          functionality.
        </p>
        <div className="mt-4 flex justify-between items-center">
          <span className="text-sm text-[#3B5998] font-medium">{category}</span>
          <button className="text-[#FF8936] hover:text-[#F7B05B] transition-colors duration-300">
            View Details <i className="fas fa-arrow-right ml-1"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
