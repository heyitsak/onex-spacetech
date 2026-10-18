import { isAuthenticated } from '@/lib/auth';
import { getContent, incrementProjectValue, incrementProjectsCount, incrementMemberCount } from '@/lib/content';

export async function GET() {
  const authed = await isAuthenticated();
  if (!authed) return new Response('Unauthorized', { status: 401 });

  const encoder = new TextEncoder();

  const stream = new ReadableStream({
    async start(controller) {
      let running = true;

      const send = async (event: string, data: unknown) => {
        if (!running) return;
        try {
          controller.enqueue(encoder.encode(`event: ${event}\ndata: ${JSON.stringify(data)}\n\n`));
        } catch {}
      };

      const tick = async () => {
        if (!running) return;
        try {
          let content = await getContent();
          content = await incrementMemberCount(content);
          content = await incrementProjectValue(content);
          content = await incrementProjectsCount(content);

          const now = Date.now();
          await send('content', {
            stats: content.stats,
            projectInfo: {
              title: content.projectInfo.title,
              description: content.projectInfo.description,
              value: content.projectInfo.value,
            },
            socialLinks: content.socialLinks,
            contactInfo: content.contactInfo,
            countdowns: {
              value: content.projectInfo.nextUpdate ? Math.max(0, content.projectInfo.nextUpdate - now) : 0,
              projects: content.stats.projectsNextUpdate ? Math.max(0, content.stats.projectsNextUpdate - now) : 0,
              members: content.memberNextUpdate ? Math.max(0, content.memberNextUpdate - now) : 0,
            },
          });
        } catch {}
      };

      await tick();
      const interval = setInterval(tick, 30000);
      const countdownInterval = setInterval(async () => {
        try {
          const content = await getContent();
          const now = Date.now();
          await send('countdowns', {
            value: content.projectInfo.nextUpdate ? Math.max(0, content.projectInfo.nextUpdate - now) : 0,
            projects: content.stats.projectsNextUpdate ? Math.max(0, content.stats.projectsNextUpdate - now) : 0,
            members: content.memberNextUpdate ? Math.max(0, content.memberNextUpdate - now) : 0,
          });
        } catch {}
      }, 1000);

      const keepalive = setInterval(() => {
        try { controller.enqueue(encoder.encode(':keepalive\n\n')); } catch {}
      }, 15000);

      return () => {
        running = false;
        clearInterval(interval);
        clearInterval(countdownInterval);
        clearInterval(keepalive);
      };
    },
  });

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
    },
  });
}
