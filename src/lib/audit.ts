import fs from 'fs';
import path from 'path';

const AUDIT_PATH = path.resolve(process.cwd(), 'admin-audit.jsonl');

export function audit(action: string, detail: Record<string, unknown> = {}) {
  try {
    const line = JSON.stringify({
      ts: Date.now(),
      action,
      ...detail,
    }) + '\n';
    fs.appendFileSync(AUDIT_PATH, line, 'utf-8');
  } catch {}
}
