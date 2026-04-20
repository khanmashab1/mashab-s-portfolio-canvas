import { useEffect, useState } from "react";
import { Plus, Trash2, Save } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

type Skill = {
  id: string;
  category: string;
  name: string;
  level: number;
  display_order: number;
};

const SkillsAdmin = () => {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);
  const [draft, setDraft] = useState({ category: "Frontend", name: "", level: 80 });

  const load = async () => {
    setLoading(true);
    const { data, error } = await supabase.from("skills").select("*").order("category").order("display_order");
    if (error) toast.error(error.message);
    else setSkills((data ?? []) as Skill[]);
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const handleAdd = async () => {
    if (!draft.name.trim()) return toast.error("Name required");
    const { error } = await supabase.from("skills").insert({
      ...draft,
      display_order: skills.filter(s => s.category === draft.category).length + 1,
    });
    if (error) return toast.error(error.message);
    setDraft({ ...draft, name: "" });
    load();
  };

  const handleUpdate = async (s: Skill, updates: Partial<Skill>) => {
    const { error } = await supabase.from("skills").update(updates).eq("id", s.id);
    if (error) toast.error(error.message);
    else load();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete?")) return;
    const { error } = await supabase.from("skills").delete().eq("id", id);
    if (error) toast.error(error.message);
    else load();
  };

  const grouped = skills.reduce<Record<string, Skill[]>>((acc, s) => {
    (acc[s.category] = acc[s.category] || []).push(s);
    return acc;
  }, {});

  return (
    <div className="space-y-4">
      <h2 className="font-display text-lg font-bold text-foreground">Skills ({skills.length})</h2>

      <div className="glass-card p-4">
        <h3 className="text-sm font-medium text-foreground mb-3">Add new skill</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
          <select value={draft.category} onChange={(e) => setDraft({ ...draft, category: e.target.value })} className="input-base">
            <option>Frontend</option>
            <option>Backend</option>
            <option>Database</option>
            <option>Tools</option>
            <option>Other</option>
          </select>
          <input placeholder="Skill name" value={draft.name} onChange={(e) => setDraft({ ...draft, name: e.target.value })} className="input-base" />
          <input type="number" min={0} max={100} value={draft.level} onChange={(e) => setDraft({ ...draft, level: parseInt(e.target.value) || 0 })} className="input-base" />
          <button onClick={handleAdd} className="flex items-center justify-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary/90">
            <Plus size={16} /> Add
          </button>
        </div>
      </div>

      {loading ? (
        <p className="text-muted-foreground text-sm">Loading…</p>
      ) : (
        <div className="space-y-4">
          {Object.entries(grouped).map(([cat, items]) => (
            <div key={cat} className="glass-card p-4">
              <h3 className="font-medium text-primary mb-3">{cat}</h3>
              <div className="space-y-2">
                {items.map((s) => (
                  <div key={s.id} className="flex items-center gap-2">
                    <input
                      defaultValue={s.name}
                      onBlur={(e) => e.target.value !== s.name && handleUpdate(s, { name: e.target.value })}
                      className="input-base flex-1"
                    />
                    <input
                      type="number" min={0} max={100} defaultValue={s.level}
                      onBlur={(e) => parseInt(e.target.value) !== s.level && handleUpdate(s, { level: parseInt(e.target.value) || 0 })}
                      className="input-base w-20"
                    />
                    <button onClick={() => handleDelete(s.id)} className="p-2 hover:bg-destructive/10 rounded-lg text-destructive">
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SkillsAdmin;
