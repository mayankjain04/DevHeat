import { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import "./profile.css";
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
    <div className="bg-white rounded-md sm:rounded-xl w-full h-full shadow-lg p-6">
      <div className="mb-5">
        <h2 className="text-xl font-bold mb-4 text-start text-black profile-text">Skill Proficiency</h2>
        <div className='h-[1px] bg-gray-200 w-full rounded'></div>
      </div>
      <div className="h-[200px] sm:h-[375px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={skills} >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" type="category" domain={[0, 100]} />
            <YAxis type="number" domain={[0, 100]} width={30} />
            <Tooltip />
            <Bar dataKey="proficiency" fill="#3B82F6"  />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default SkillsChart;
