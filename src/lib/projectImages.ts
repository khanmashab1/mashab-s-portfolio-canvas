import projectMedicare from "@/assets/project-medicare.png";
import projectNoorduas from "@/assets/project-noorduas.png";
import projectNoorduas2 from "@/assets/project-noorduas2.png";
import projectTendering from "@/assets/project-tendering.png";
import projectEnergy1 from "@/assets/project-energy1.png";
import projectEnergy2 from "@/assets/project-energy2.png";
import projectEnergy3 from "@/assets/project-energy3.png";
import projectZicmart1 from "@/assets/project-zicmart1.png";
import projectZicmart2 from "@/assets/project-zicmart2.png";
import projectZicmart3 from "@/assets/project-zicmart3.png";

// Maps DB image keys to bundled assets so existing projects keep working.
// New projects can use full URLs instead.
export const projectImageMap: Record<string, string> = {
  "project-medicare": projectMedicare,
  "project-noorduas": projectNoorduas,
  "project-noorduas2": projectNoorduas2,
  "project-tendering": projectTendering,
  "project-energy1": projectEnergy1,
  "project-energy2": projectEnergy2,
  "project-energy3": projectEnergy3,
  "project-zicmart1": projectZicmart1,
  "project-zicmart2": projectZicmart2,
  "project-zicmart3": projectZicmart3,
};

export const resolveImage = (key: string): string => {
  if (key.startsWith("http://") || key.startsWith("https://") || key.startsWith("/")) return key;
  return projectImageMap[key] ?? key;
};
