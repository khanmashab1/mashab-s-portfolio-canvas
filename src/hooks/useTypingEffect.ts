import { useState, useEffect } from "react";

const skills = [
  "React & Next.js",
  "Node.js & Express",
  "TypeScript",
  "Supabase & PostgreSQL",
  "Secure Authentication",
  "RESTful APIs",
  "Tailwind CSS",
];

const useTypingEffect = (speed = 100, deleteSpeed = 50, pauseTime = 2000) => {
  const [currentSkillIndex, setCurrentSkillIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentSkill = skills[currentSkillIndex];

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (displayText.length < currentSkill.length) {
          setDisplayText(currentSkill.slice(0, displayText.length + 1));
        } else {
          setTimeout(() => setIsDeleting(true), pauseTime);
        }
      } else {
        if (displayText.length > 0) {
          setDisplayText(displayText.slice(0, -1));
        } else {
          setIsDeleting(false);
          setCurrentSkillIndex((prev) => (prev + 1) % skills.length);
        }
      }
    }, isDeleting ? deleteSpeed : speed);

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, currentSkillIndex, speed, deleteSpeed, pauseTime]);

  return displayText;
};

export default useTypingEffect;
