import cors from '@/lib/cors';
import { transformData } from '@/lib/transform-data';

const STATS_API_URL = process.env.STATS_API_URL || 'https://api.github.com/repos/KatalystDigital/shieldsign-core';

export async function GET(request: Request) {
  const res = await fetch(`${STATS_API_URL}/stripe`);
  const EARLY_ADOPTERS_DATA = await res.json();

  const transformedData = transformData({
    data: EARLY_ADOPTERS_DATA,
    metric: 'earlyAdopters',
  });

  return cors(
    request,
    new Response(JSON.stringify(transformedData), {
      status: 200,
      headers: {
        'content-type': 'application/json',
      },
    }),
  );
}

export function OPTIONS(request: Request) {
  return cors(
    request,
    new Response(null, {
      status: 204,
    }),
  );
}
