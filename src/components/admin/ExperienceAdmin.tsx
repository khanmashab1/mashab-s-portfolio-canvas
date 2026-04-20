import { useEffect, useState } from "react";
import { Plus, Trash2, Pencil, X, Save } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

type Experience = {
  id: string;
  role: string;
  company: string;
  period: string;
  description: string;
  highlights: string[];
  display_order: number;
};

const empty = (): Omit<Experience, "id"> => ({
  role: "", company: "", period: "", description: "", highlights: [], display_order: 0,
});

const ExperienceAdmin = () => {
  const [items, setItems] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState<Experience | Omit<Experience, "id"> | null>(null);

  const load = async () => {
    setLoading(true);
    const { data, error } = await supabase.from("experience").select("*").order("display_order");
    if (error) toast.error(error.message);
    else setItems((data ?? []) as Experience[]);
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const handleSave = async () => {
    if (!form) return;
    if (!form.role.trim() || !form.company.trim()) return toast.error("Role and company required");
    if ("id" in form) {
      const { id, ...rest } = form;
      const { error } = await supabase.from("experience").update(rest).eq("id", id);
      if (error) return toast.error(error.message);
      toast.success("Updated");
    } else {
      const { error } = await supabase.from("experience").insert(form);
      if (error) return toast.error(error.message);
      toast.success("Created");
    }
    setForm(null);
    load();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete?")) return;
    const { error } = await supabase.from("experience").delete().eq("id", id);
    if (error) toast.error(error.message);
    else load();
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="font-display text-lg font-bold text-foreground">Experience ({items.length})</h2>
        <button onClick={() => setForm(empty())} className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary/90">
          <Plus size={16} /> Add Entry
        </button>
      </div>

      {loading ? (
        <p className="text-muted-foreground text-sm">Loading…</p>
      ) : (
        <div className="space-y-3">
          {items.map((e) => (
            <div key={e.id} className="glass-card p-4 flex items-start justify-between gap-4">
              <div className="flex-1 min-w-0">
                <h3 className="font-medium text-foreground">{e.role}</h3>
                <p className="text-sm text-primary">{e.company}</p>
                <p className="text-xs text-muted-foreground mt-1">{e.period}</p>
                <p className="text-xs text-muted-foreground line-clamp-2 mt-2">{e.description}</p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <button onClick={() => setForm(e)} className="p-2 hover:bg-secondary rounded-lg text-muted-foreground hover:text-foreground">
                  <Pencil size={16} />
                </button>
                <button onClick={() => handleDelete(e.id)} className="p-2 hover:bg-destructive/10 rounded-lg text-destructive">
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {form && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-background border border-border rounded-2xl max-w-xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-background border-b border-border p-4 flex items-center justify-between">
              <h3 className="font-display font-bold text-foreground">{"id" in form ? "Edit" : "New"} Entry</h3>
              <button onClick={() => setForm(null)} className="p-2 hover:bg-secondary rounded-lg"><X size={18} /></button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1.5">Role / Title</label>
                <input value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} className="input-base" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1.5">Company / Organization</label>
                <input value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} className="input-base" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1.5">Period</label>
                <input value={form.period} onChange={(e) => setForm({ ...form, period: e.target.value })} className="input-base" placeholder="2022 - Present" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1.5">Description</label>
                <textarea rows={4} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className="input-base resize-none" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1.5">Display order</label>
                <input type="number" value={form.display_order} onChange={(e) => setForm({ ...form, display_order: parseInt(e.target.value) || 0 })} className="input-base" />
              </div>
            </div>
            <div className="sticky bottom-0 bg-background border-t border-border p-4 flex justify-end gap-2">
              <button onClick={() => setForm(null)} className="px-4 py-2 text-sm text-muted-foreground hover:text-foreground">Cancel</button>
              <button onClick={handleSave} className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary/90">
                <Save size={16} /> Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExperienceAdmin;
