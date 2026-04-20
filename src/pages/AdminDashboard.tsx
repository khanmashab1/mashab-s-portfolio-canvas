import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { LogOut, FolderKanban, Mail, Wrench, GraduationCap } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { supabase } from "@/integrations/supabase/client";
import { useAdminAuth } from "@/hooks/useAdminAuth";
import { toast } from "sonner";
import ProjectsAdmin from "@/components/admin/ProjectsAdmin";
import MessagesAdmin from "@/components/admin/MessagesAdmin";
import SkillsAdmin from "@/components/admin/SkillsAdmin";
import ExperienceAdmin from "@/components/admin/ExperienceAdmin";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { session, isAdmin, loading } = useAdminAuth();

  useEffect(() => {
    if (loading) return;
    if (!session) {
      navigate("/admin", { replace: true });
    } else if (!isAdmin) {
      toast.error("You don't have admin access");
      supabase.auth.signOut();
      navigate("/admin", { replace: true });
    }
  }, [session, isAdmin, loading, navigate]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    toast.success("Signed out");
    navigate("/admin");
  };

  if (loading || !session || !isAdmin) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-muted-foreground">Loading…</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-background/80 backdrop-blur sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="font-display text-xl font-bold text-foreground">Admin Dashboard</h1>
            <p className="text-xs text-muted-foreground">{session.user.email}</p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => navigate("/")}
              className="text-sm text-muted-foreground hover:text-foreground px-3 py-2 rounded-lg transition-colors"
            >
              View Site
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 text-sm bg-secondary hover:bg-secondary/80 text-foreground px-3 py-2 rounded-lg transition-colors"
            >
              <LogOut size={16} /> Logout
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 md:px-6 py-8">
        <Tabs defaultValue="projects" className="w-full">
          <TabsList className="grid grid-cols-2 md:grid-cols-4 mb-6 h-auto">
            <TabsTrigger value="projects" className="flex items-center gap-2 py-2.5">
              <FolderKanban size={16} /> Projects
            </TabsTrigger>
            <TabsTrigger value="messages" className="flex items-center gap-2 py-2.5">
              <Mail size={16} /> Messages
            </TabsTrigger>
            <TabsTrigger value="skills" className="flex items-center gap-2 py-2.5">
              <Wrench size={16} /> Skills
            </TabsTrigger>
            <TabsTrigger value="experience" className="flex items-center gap-2 py-2.5">
              <GraduationCap size={16} /> Experience
            </TabsTrigger>
          </TabsList>
          <TabsContent value="projects"><ProjectsAdmin /></TabsContent>
          <TabsContent value="messages"><MessagesAdmin /></TabsContent>
          <TabsContent value="skills"><SkillsAdmin /></TabsContent>
          <TabsContent value="experience"><ExperienceAdmin /></TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default AdminDashboard;
