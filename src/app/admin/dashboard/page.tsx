'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { validateStats, validateProjectInfo, validateSocialLinks, validateContactInfo } from '@/lib/validation';

type Tab = 'stats' | 'project' | 'social' | 'contact';

function formatCountdown(ms: number): string {
  if (ms <= 0) return 'now';
  const m = Math.floor(ms / 60000);
  const s = Math.floor((ms % 60000) / 1000);
  return `${m}m ${s}s`;
}

export default function AdminDashboardPage() {
  const router = useRouter();

  const [content, setContent] = useState<any>(null);
  const [countdowns, setCountdowns] = useState<any>({});
  const [saving, setSaving] = useState(false);
  const [saveMsg, setSaveMsg] = useState('');
  const [activeTab, setActiveTab] = useState<Tab>('stats');

  useEffect(() => {
    let evtSource: EventSource | null = null;
    let reconnectTimer: ReturnType<typeof setTimeout>;

    const connect = () => {
      evtSource = new EventSource('/api/admin/stream');

      evtSource.addEventListener('content', (e) => {
        try { setContent(JSON.parse(e.data)); } catch {}
      });

      evtSource.addEventListener('countdowns', (e) => {
        try { setCountdowns(JSON.parse(e.data)); } catch {}
      });

      evtSource.onerror = () => {
        evtSource?.close();
        reconnectTimer = setTimeout(connect, 3000);
      };
    };

    connect();
    return () => {
      evtSource?.close();
      clearTimeout(reconnectTimer);
    };
  }, []);

  const handleSave = useCallback(async (path: string, data: unknown) => {
    setSaving(true);
    setSaveMsg('');
    try {
      const payload = path === 'increment' ? {} : { [path]: data };
      const res = await fetch('/api/content', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        setSaveMsg('Saved');
      } else if (res.status === 401) {
        router.push('/admin/login');
        return;
      } else {
        setSaveMsg('Save failed');
      }
    } catch {
      setSaveMsg('Connection error');
    }
    setSaving(false);
    setTimeout(() => setSaveMsg(''), 3000);
  }, [router]);

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/admin/login');
  };

  const tabs: { id: Tab; label: string }[] = [
    { id: 'stats', label: 'Stats' },
    { id: 'project', label: 'Project Value' },
    { id: 'social', label: 'Social Links' },
    { id: 'contact', label: 'Contact Info' },
  ];

  return (
    <div className="min-h-screen bg-[#0A0C10] flex">
      {/* Sidebar */}
      <div className="w-56 flex-shrink-0 border-r border-[rgba(255,255,255,0.04)] flex flex-col">
        <div className="px-5 py-5 border-b border-[rgba(255,255,255,0.04)]">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded bg-[#5472E6] flex items-center justify-center">
              <span className="text-white text-[8px] font-bold">X</span>
            </div>
            <span className="text-xs font-semibold text-[#E8ECF4]">Admin</span>
          </div>
          <div className="text-[10px] text-[#5A6275] mt-1">OneX SpaceTechnologies</div>
        </div>
        <nav className="flex-1 py-3 px-2 space-y-0.5">
          {tabs.map(t => (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id)}
              className={`w-full text-left px-3 py-2 rounded-lg text-xs transition-colors ${
                activeTab === t.id
                  ? 'bg-[rgba(84,114,230,0.1)] text-[#5472E6]'
                  : 'text-[#5A6275] hover:text-[#8A92A5] hover:bg-[rgba(255,255,255,0.02)]'
              }`}
            >
              {t.label}
            </button>
          ))}
        </nav>
        <div className="px-2 py-3 border-t border-[rgba(255,255,255,0.04)] space-y-1">
          <button
            onClick={handleLogout}
            className="w-full text-left px-3 py-2 rounded-lg text-xs text-[#5A6275] hover:text-[#E55454] hover:bg-[rgba(229,84,84,0.04)] transition-colors"
          >
            Sign Out
          </button>
        </div>
      </div>

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0">
        <div className="px-6 py-3 border-b border-[rgba(255,255,255,0.04)] flex items-center justify-between">
          <span className="text-xs text-[#5A6275] uppercase tracking-wider">
            {tabs.find(t => t.id === activeTab)?.label || ''}
          </span>
          <div className="flex items-center gap-3">
            {saveMsg && <span className="text-[11px] text-[#54E58A]">{saveMsg}</span>}
            {saving && <span className="text-[11px] text-[#5A6275]">Saving...</span>}
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-6">
          {!content ? (
            <div className="flex items-center justify-center h-full">
              <div className="w-6 h-6 rounded-full border-2 border-[rgba(255,255,255,0.1)] border-t-[#5472E6] animate-spin" />
            </div>
          ) : (
            <>
              {activeTab === 'stats' && (
                <div className="max-w-2xl space-y-4">
                  <p className="text-[11px] text-[#5A6275] mb-4">
                    Edit the numbers shown in the stats section. Auto-increment:{' '}
                    <span className="text-[#8A92A5]">{formatCountdown(countdowns.members || 0)} (members) / {formatCountdown(countdowns.projects || 0)} (projects)</span>
                  </p>
                  <Field label="Members" value={content.stats?.members ?? 0} onChange={v => {
                    const data = validateStats({ ...content.stats, members: v });
                    handleSave('stats', data);
                  }} />
                  <Field label="Services" value={content.stats?.services ?? 0} onChange={v => {
                    const data = validateStats({ ...content.stats, services: v });
                    handleSave('stats', data);
                  }} />
                  <Field label="Projects" value={content.stats?.projects ?? 0} onChange={v => {
                    const data = validateStats({ ...content.stats, projects: v });
                    handleSave('stats', data);
                  }} />
                  <Field label="Events" value={content.stats?.events ?? 0} onChange={v => {
                    const data = validateStats({ ...content.stats, events: v });
                    handleSave('stats', data);
                  }} />
                </div>
              )}

              {activeTab === 'project' && (
                <div className="max-w-2xl space-y-4">
                  <p className="text-[11px] text-[#5A6275] mb-4">
                    Project Ecosystem Value. Auto-increment: <span className="text-[#8A92A5]">{formatCountdown(countdowns.value || 0)}</span>
                  </p>
                  <TextInput label="Title" value={content.projectInfo?.title ?? ''} onChange={v => {
                    const data = validateProjectInfo({ ...content.projectInfo, title: v });
                    handleSave('projectInfo', data);
                  }} />
                  <TextInput label="Description" value={content.projectInfo?.description ?? ''} onChange={v => {
                    const data = validateProjectInfo({ ...content.projectInfo, description: v });
                    handleSave('projectInfo', data);
                  }} />
                  <Field label="Value" value={content.projectInfo?.value ?? 0} onChange={v => {
                    const data = validateProjectInfo({ ...content.projectInfo, value: v });
                    handleSave('projectInfo', data);
                  }} />
                </div>
              )}

              {activeTab === 'social' && (
                <div className="max-w-2xl space-y-4">
                  <p className="text-[11px] text-[#5A6275] mb-4">Social URLs. Leave empty to hide that platform.</p>
                  <TextInput label="Discord" value={content.socialLinks?.discord ?? ''} onChange={v => {
                    const data = validateSocialLinks({ ...content.socialLinks, discord: v });
                    handleSave('socialLinks', data);
                  }} />
                  <TextInput label="YouTube" value={content.socialLinks?.youtube ?? ''} onChange={v => {
                    const data = validateSocialLinks({ ...content.socialLinks, youtube: v });
                    handleSave('socialLinks', data);
                  }} />
                  <TextInput label="GitHub" value={content.socialLinks?.github ?? ''} onChange={v => {
                    const data = validateSocialLinks({ ...content.socialLinks, github: v });
                    handleSave('socialLinks', data);
                  }} />
                  <TextInput label="Twitter" value={content.socialLinks?.twitter ?? ''} onChange={v => {
                    const data = validateSocialLinks({ ...content.socialLinks, twitter: v });
                    handleSave('socialLinks', data);
                  }} />
                </div>
              )}

              {activeTab === 'contact' && (
                <div className="max-w-2xl space-y-4">
                  <p className="text-[11px] text-[#5A6275] mb-4">Contact info shown on the contact page.</p>
                  <TextInput label="Email" value={content.contactInfo?.email ?? ''} onChange={v => {
                    const data = validateContactInfo({ ...content.contactInfo, email: v });
                    handleSave('contactInfo', data);
                  }} />
                  <TextInput label="Location" value={content.contactInfo?.location ?? ''} onChange={v => {
                    const data = validateContactInfo({ ...content.contactInfo, location: v });
                    handleSave('contactInfo', data);
                  }} />
                  <TextInput label="Website" value={content.contactInfo?.website ?? ''} onChange={v => {
                    const data = validateContactInfo({ ...content.contactInfo, website: v });
                    handleSave('contactInfo', data);
                  }} />
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function Field({ label, value, onChange }: { label: string; value: number; onChange: (v: number) => void }) {
  return (
    <div className="flex items-center gap-3">
      <div className="w-24 text-right text-[11px] text-[#5A6275] shrink-0">{label}:</div>
      <input
        type="number"
        value={value}
        onChange={e => onChange(Number(e.target.value) || 0)}
        className="flex-1 max-w-xs input"
      />
    </div>
  );
}

function TextInput({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <div className="flex items-center gap-3">
      <div className="w-24 text-right text-[11px] text-[#5A6275] shrink-0">{label}:</div>
      <input
        type="text"
        value={value}
        onChange={e => onChange(e.target.value)}
        className="flex-1 max-w-md input"
      />
    </div>
  );
}
