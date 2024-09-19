import React from "react";
import { useLoaderData, Link } from "react-router-dom";
import { motion } from "framer-motion";
import "../styles/research.css";
import { getProfessors } from "../professors";

interface ProfessorProfile {
  name: string;
  id: string;
  pic: string;
  researchDesc: string;
}

interface ProfessorCardProps {
  professor: ProfessorProfile;
}

interface LoaderData {
  professors: ProfessorProfile[];
}

export async function loader(): Promise<LoaderData> {
  const professors = await getProfessors();
  return { professors };
}

const ProfessorCard: React.FC<ProfessorCardProps> = ({ professor }) => {
  return (
    <Link to={`${professor.id}`}>
      <motion.div
        className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
        whileHover={{ scale: 1.05 }} // Slight scaling effect on hover
        initial={{ opacity: 0, y: 20 }} // Initial animation state
        animate={{ opacity: 1, y: 0 }} // Animation to final state
        transition={{ duration: 0.4 }} // Duration of the animation
      >
        <div className="flex items-center p-4">
          <img
            src={professor.pic}
            alt={professor.name}
            className="w-20 h-28 rounded object-cover mr-4"
          />
          <div className="flex flex-col">
            <h3 className="text-xl font-bold text-gray-800">
              {professor.name}
            </h3>
            <p className="text-sm text-gray-600">{professor.researchDesc}</p>
          </div>
        </div>
      </motion.div>
    </Link>
  );
};

export default function Research() {
  const { professors }: LoaderData = useLoaderData() as LoaderData;

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-center mb-8">Our Researchers</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {professors &&
          professors.map((professor: ProfessorProfile, idx: number) => (
            <ProfessorCard professor={professor} key={idx} />
          ))}
      </div>
    </div>
  );
}
