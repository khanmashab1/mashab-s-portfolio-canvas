import { useEffect, useState } from "react";
import { Plus, Pencil, Trash2, Star, X, Save, Upload, ImageIcon } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { resolveImage } from "@/lib/projectImages";

type Project = {
  id: string;
  title: string;
  description: string;
  tech: string[];
  features: string[];
  images: string[];
  github: string | null;
  live: string | null;
  featured: boolean;
  display_order: number;
};

const empty = (): Omit<Project, "id"> => ({
  title: "", description: "", tech: [], features: [], images: [],
  github: "", live: "", featured: false, display_order: 0,
});

const ProjectsAdmin = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Project | null>(null);
  const [creating, setCreating] = useState<Omit<Project, "id"> | null>(null);

  const load = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .order("display_order", { ascending: true });
    if (error) toast.error(error.message);
    else setProjects((data ?? []) as Project[]);
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this project?")) return;
    const { error } = await supabase.from("projects").delete().eq("id", id);
    if (error) toast.error(error.message);
    else { toast.success("Deleted"); load(); }
  };

  const handleSave = async (p: Project | Omit<Project, "id">) => {
    if (!p.title.trim() || !p.description.trim()) {
      toast.error("Title and description are required");
      return;
    }
    if ("id" in p) {
      const { id, ...rest } = p;
      const { error } = await supabase.from("projects").update(rest).eq("id", id);
      if (error) return toast.error(error.message);
      toast.success("Updated");
    } else {
      const { error } = await supabase.from("projects").insert(p);
      if (error) return toast.error(error.message);
      toast.success("Created");
    }
    setEditing(null);
    setCreating(null);
    load();
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="font-display text-lg font-bold text-foreground">Projects ({projects.length})</h2>
        <button
          onClick={() => setCreating(empty())}
          className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary/90"
        >
          <Plus size={16} /> Add Project
        </button>
      </div>

      {loading ? (
        <p className="text-muted-foreground text-sm">Loading…</p>
      ) : (
        <div className="space-y-3">
          {projects.map((p) => (
            <div key={p.id} className="glass-card p-4 flex items-start justify-between gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  {p.featured && <Star size={14} className="text-primary fill-primary" />}
                  <h3 className="font-medium text-foreground truncate">{p.title}</h3>
                </div>
                <p className="text-xs text-muted-foreground line-clamp-2">{p.description}</p>
                <div className="flex flex-wrap gap-1 mt-2">
                  {p.tech.slice(0, 5).map((t) => (
                    <span key={t} className="text-[10px] px-2 py-0.5 bg-secondary text-secondary-foreground rounded">{t}</span>
                  ))}
                </div>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <button onClick={() => setEditing(p)} className="p-2 hover:bg-secondary rounded-lg text-muted-foreground hover:text-foreground">
                  <Pencil size={16} />
                </button>
                <button onClick={() => handleDelete(p.id)} className="p-2 hover:bg-destructive/10 rounded-lg text-destructive">
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {(editing || creating) && (
        <ProjectForm
          initial={editing ?? creating!}
          onCancel={() => { setEditing(null); setCreating(null); }}
          onSave={handleSave}
          isEdit={!!editing}
        />
      )}
    </div>
  );
};

const ProjectForm = ({
  initial, onCancel, onSave, isEdit,
}: {
  initial: Project | Omit<Project, "id">;
  onCancel: () => void;
  onSave: (p: any) => void;
  isEdit: boolean;
}) => {
  const [data, setData] = useState(initial);
  const techStr = data.tech.join(", ");
  const featStr = data.features.join("\n");
  const imgStr = data.images.join("\n");

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-background border border-border rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-background border-b border-border p-4 flex items-center justify-between">
          <h3 className="font-display font-bold text-foreground">{isEdit ? "Edit" : "New"} Project</h3>
          <button onClick={onCancel} className="p-2 hover:bg-secondary rounded-lg"><X size={18} /></button>
        </div>
        <div className="p-6 space-y-4">
          <Field label="Title">
            <input value={data.title} onChange={(e) => setData({ ...data, title: e.target.value })} className="input-base" />
          </Field>
          <Field label="Description">
            <textarea rows={4} value={data.description} onChange={(e) => setData({ ...data, description: e.target.value })} className="input-base resize-none" />
          </Field>
          <Field label="Tech (comma separated)">
            <input value={techStr} onChange={(e) => setData({ ...data, tech: e.target.value.split(",").map(s => s.trim()).filter(Boolean) })} className="input-base" />
          </Field>
          <Field label="Features (one per line)">
            <textarea rows={5} value={featStr} onChange={(e) => setData({ ...data, features: e.target.value.split("\n").map(s => s.trim()).filter(Boolean) })} className="input-base resize-none" />
          </Field>
          <Field label="Image keys or URLs (one per line)">
            <textarea rows={3} value={imgStr} onChange={(e) => setData({ ...data, images: e.target.value.split("\n").map(s => s.trim()).filter(Boolean) })} className="input-base resize-none" placeholder="project-medicare or https://..." />
            <p className="text-[11px] text-muted-foreground mt-1">Use keys like <code>project-medicare</code> for built-in images, or full URLs for new images.</p>
          </Field>
          <div className="grid grid-cols-2 gap-4">
            <Field label="GitHub URL">
              <input value={data.github ?? ""} onChange={(e) => setData({ ...data, github: e.target.value })} className="input-base" />
            </Field>
            <Field label="Live URL">
              <input value={data.live ?? ""} onChange={(e) => setData({ ...data, live: e.target.value })} className="input-base" />
            </Field>
          </div>
          <div className="grid grid-cols-2 gap-4 items-end">
            <Field label="Display order">
              <input type="number" value={data.display_order} onChange={(e) => setData({ ...data, display_order: parseInt(e.target.value) || 0 })} className="input-base" />
            </Field>
            <label className="flex items-center gap-2 text-sm text-foreground py-3">
              <input type="checkbox" checked={data.featured} onChange={(e) => setData({ ...data, featured: e.target.checked })} className="w-4 h-4 accent-primary" />
              Featured
            </label>
          </div>
        </div>
        <div className="sticky bottom-0 bg-background border-t border-border p-4 flex justify-end gap-2">
          <button onClick={onCancel} className="px-4 py-2 text-sm text-muted-foreground hover:text-foreground">Cancel</button>
          <button onClick={() => onSave(data)} className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary/90">
            <Save size={16} /> Save
          </button>
        </div>
      </div>
    </div>
  );
};

const Field = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <div>
    <label className="block text-sm font-medium text-foreground mb-1.5">{label}</label>
    {children}
  </div>
);

export default ProjectsAdmin;
