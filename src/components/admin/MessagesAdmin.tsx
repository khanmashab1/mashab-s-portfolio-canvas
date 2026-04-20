import { useEffect, useState } from "react";
import { Trash2, Mail, MailOpen, ExternalLink } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

type Message = {
  id: string;
  name: string;
  email: string;
  message: string;
  read: boolean;
  created_at: string;
};

const MessagesAdmin = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState<string | null>(null);

  const load = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("contact_messages")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) toast.error(error.message);
    else setMessages((data ?? []) as Message[]);
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const toggleRead = async (m: Message) => {
    const { error } = await supabase.from("contact_messages").update({ read: !m.read }).eq("id", m.id);
    if (error) toast.error(error.message);
    else load();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this message?")) return;
    const { error } = await supabase.from("contact_messages").delete().eq("id", id);
    if (error) toast.error(error.message);
    else { toast.success("Deleted"); load(); }
  };

  const unreadCount = messages.filter(m => !m.read).length;

  return (
    <div className="space-y-4">
      <h2 className="font-display text-lg font-bold text-foreground">
        Messages ({messages.length}) {unreadCount > 0 && <span className="ml-2 text-xs bg-primary text-primary-foreground px-2 py-0.5 rounded-full">{unreadCount} new</span>}
      </h2>

      {loading ? (
        <p className="text-muted-foreground text-sm">Loading…</p>
      ) : messages.length === 0 ? (
        <p className="text-muted-foreground text-sm">No messages yet.</p>
      ) : (
        <div className="space-y-3">
          {messages.map((m) => (
            <div key={m.id} className={`glass-card p-4 ${!m.read ? "border-primary/40" : ""}`}>
              <div className="flex items-start justify-between gap-4">
                <button
                  onClick={() => { setExpanded(expanded === m.id ? null : m.id); if (!m.read) toggleRead(m); }}
                  className="flex-1 text-left min-w-0"
                >
                  <div className="flex items-center gap-2 mb-1">
                    {m.read ? <MailOpen size={14} className="text-muted-foreground" /> : <Mail size={14} className="text-primary" />}
                    <h3 className="font-medium text-foreground truncate">{m.name}</h3>
                    <span className="text-xs text-muted-foreground">· {new Date(m.created_at).toLocaleString()}</span>
                  </div>
                  <p className="text-xs text-muted-foreground truncate">{m.email}</p>
                  <p className={`text-sm text-foreground mt-2 ${expanded === m.id ? "" : "line-clamp-2"}`}>{m.message}</p>
                </button>
                <div className="flex items-center gap-2 shrink-0">
                  <a href={`mailto:${m.email}`} className="p-2 hover:bg-secondary rounded-lg text-muted-foreground hover:text-foreground" title="Reply">
                    <ExternalLink size={16} />
                  </a>
                  <button onClick={() => handleDelete(m.id)} className="p-2 hover:bg-destructive/10 rounded-lg text-destructive">
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MessagesAdmin;
