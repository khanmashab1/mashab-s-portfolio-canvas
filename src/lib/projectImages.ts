import projectMedicare from "@/assets/project-medicare.webp";
import projectNoorduas from "@/assets/project-noorduas.webp";
import projectNoorduas2 from "@/assets/project-noorduas2.webp";
import projectTendering from "@/assets/project-tendering.webp";
import projectEnergy1 from "@/assets/project-energy1.webp";
import projectEnergy2 from "@/assets/project-energy2.webp";
import projectEnergy3 from "@/assets/project-energy3.webp";
import projectZicmart1 from "@/assets/project-zicmart1.webp";
import projectZicmart2 from "@/assets/project-zicmart2.webp";
import projectZicmart3 from "@/assets/project-zicmart3.webp";
import projectNikahverse from "@/assets/project-nikahverse.webp";
import projectResumecraft from "@/assets/project-resumecraft.webp";
import projectNovanode from "@/assets/project-novanode.webp";

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
  "project-nikahverse": projectNikahverse,
  "project-resumecraft": projectResumecraft,
  "project-novanode": projectNovanode,
};

export const resolveImage = (key: string): string => {
  if (key.startsWith("http://") || key.startsWith("https://") || key.startsWith("/")) return key;
  return projectImageMap[key] ?? key;
};
