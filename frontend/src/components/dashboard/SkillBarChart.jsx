import { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const SkillsChart = ({userData}) => {
  const [skills, setSkills] = useState([]);

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const formattedSkills = Object.entries(userData.skills).map(([key, value]) => ({
          name: key.trim(),
          proficiency: value,
        }));
        
        setSkills(formattedSkills);
      } catch (error) {
        console.error("Error fetching skills:", error);
      }
    };

    fetchSkills();
  }, []);

  return (
    <div className="absolute w-6/12 right-32 top-1/2 transform -translate-y-1/2 bg-white shadow-lg rounded-2xl">
      <h2 className="text-xl font-bold mb-4 text-center text-black">Skill Proficiency</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={skills} layout="vertical" margin={{ left: 30 }}>
          <XAxis type="number" domain={[0, 100]} hide />
          <YAxis dataKey="name" type="category" width={120} />
          <Tooltip />
          <Bar dataKey="proficiency" fill="#4F46E5" radius={[5, 5, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SkillsChart;
