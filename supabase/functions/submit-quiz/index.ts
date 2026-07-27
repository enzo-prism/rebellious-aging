import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.57.0';

const DEFAULT_ALLOWED_ORIGINS = [
  'https://www.rebelwithsuz.com',
  'https://rebelwithsuz.com',
  'http://localhost:3000',
  'http://localhost:4173',
];
const MAX_BODY_BYTES = 16_384;
const MAX_EMAIL_LENGTH = 254;
const MAX_NAME_LENGTH = 100;
const MAX_LONG_TEXT_LENGTH = 2_000;

const configuredOrigins = (Deno.env.get('ALLOWED_ORIGINS') ?? '')
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean);
const allowedOrigins = new Set([...DEFAULT_ALLOWED_ORIGINS, ...configuredOrigins]);

const getCorsHeaders = (origin: string | null) => ({
  'Access-Control-Allow-Origin': origin && allowedOrigins.has(origin) ? origin : DEFAULT_ALLOWED_ORIGINS[0],
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Vary': 'Origin',
});

const jsonResponse = (body: Record<string, unknown>, status: number, origin: string | null) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { ...getCorsHeaders(origin), 'Content-Type': 'application/json' },
  });

interface QuizSubmissionRequest {
  pillarType: string;
  rating: number;
  challenge: string;
  goals: string;
  userEmail: string;
  userName?: string;
}

serve(async (req) => {
  const origin = req.headers.get('origin');

  if (!origin || !allowedOrigins.has(origin)) {
    return jsonResponse({ error: 'Origin not allowed' }, 403, origin);
  }

  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: getCorsHeaders(origin) });
  }

  if (req.method !== 'POST') {
    return jsonResponse({ error: 'Method not allowed' }, 405, origin);
  }

  try {
    const contentLength = Number(req.headers.get('content-length') ?? 0);
    if (Number.isFinite(contentLength) && contentLength > MAX_BODY_BYTES) {
      return jsonResponse({ error: 'Request body is too large' }, 413, origin);
    }

    // Initialize Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    
    const supabase = createClient(supabaseUrl, supabaseServiceKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false
      }
    });

    // Parse request body
    const rawBody = await req.text();
    if (new TextEncoder().encode(rawBody).byteLength > MAX_BODY_BYTES) {
      return jsonResponse({ error: 'Request body is too large' }, 413, origin);
    }

    let payload: unknown;
    try {
      payload = JSON.parse(rawBody);
    } catch {
      return jsonResponse({ error: 'Invalid request body' }, 400, origin);
    }

    if (!payload || typeof payload !== 'object' || Array.isArray(payload)) {
      return jsonResponse({ error: 'Invalid request body' }, 400, origin);
    }

    const {
      pillarType,
      rating,
      challenge,
      goals,
      userEmail,
      userName
    } = payload as Partial<QuizSubmissionRequest>;

    // Validate required fields
    if (typeof pillarType !== 'string' || !pillarType || typeof userEmail !== 'string' || !userEmail) {
      return jsonResponse(
        { error: 'Missing required fields: pillarType, rating, and userEmail are required' },
        400,
        origin,
      );
    }

    if (
      (challenge !== undefined && typeof challenge !== 'string') ||
      (goals !== undefined && typeof goals !== 'string') ||
      (userName !== undefined && typeof userName !== 'string')
    ) {
      return jsonResponse({ error: 'Invalid field types' }, 400, origin);
    }

    const normalizedEmail = userEmail.trim().toLowerCase();
    const normalizedName = userName?.trim() ?? '';
    const normalizedChallenge = challenge?.trim() ?? '';
    const normalizedGoals = goals?.trim() ?? '';

    if (
      normalizedEmail.length > MAX_EMAIL_LENGTH ||
      normalizedName.length > MAX_NAME_LENGTH ||
      normalizedChallenge.length > MAX_LONG_TEXT_LENGTH ||
      normalizedGoals.length > MAX_LONG_TEXT_LENGTH
    ) {
      return jsonResponse({ error: 'One or more fields exceed the allowed length' }, 400, origin);
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(normalizedEmail)) {
      return jsonResponse({ error: 'Invalid email format' }, 400, origin);
    }

    // Validate pillar type
    const validPillarTypes = ['confidence', 'style', 'health'];
    if (!validPillarTypes.includes(pillarType)) {
      console.error('Invalid pillar type received:', pillarType, 'Expected one of:', validPillarTypes);
      return jsonResponse(
        {
          error: 'Invalid pillar type',
          details: `Pillar type '${pillarType}' is not valid. Must be one of: ${validPillarTypes.join(', ')}`
        },
        400,
        origin,
      );
    }

    // Validate rating range
    if (typeof rating !== 'number' || !Number.isInteger(rating) || rating < 1 || rating > 5) {
      return jsonResponse({ error: 'Rating must be an integer between 1 and 5' }, 400, origin);
    }

    // Insert quiz submission into database
    const { data, error } = await supabase
      .from('quiz_submissions')
      .insert({
        pillar_type: pillarType,
        rating: rating,
        challenge: normalizedChallenge || null,
        goals: normalizedGoals || null,
        user_email: normalizedEmail,
        user_name: normalizedName || null,
      })
      .select('id')
      .single();

    if (error) {
      console.error('Database error:', error);
      return jsonResponse({ error: 'Failed to save quiz submission' }, 500, origin);
    }

    return jsonResponse({
      success: true,
      message: 'Quiz submitted successfully',
      id: data.id
    }, 200, origin);

  } catch (error) {
    console.error('Error in submit-quiz function:', error);
    return jsonResponse({ error: 'Internal server error' }, 500, origin);
  }
});
