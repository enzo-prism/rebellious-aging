import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.57.0';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface QuizSubmissionRequest {
  pillarType: string;
  rating: number;
  challenge: string;
  goals: string;
  userEmail: string;
  userName?: string;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }

  try {
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
    const {
      pillarType,
      rating,
      challenge,
      goals,
      userEmail,
      userName
    }: QuizSubmissionRequest = await req.json();

    // Log received data for debugging
    console.log('Received quiz submission:', { 
      pillarType, 
      rating, 
      challenge: challenge ? 'present' : 'empty', 
      goals: goals ? 'present' : 'empty', 
      userEmail: userEmail ? 'present' : 'empty', 
      userName: userName ? 'present' : 'empty' 
    });

    // Validate required fields
    if (!pillarType || !rating || !userEmail) {
      return new Response(JSON.stringify({ error: 'Missing required fields: pillarType, rating, and userEmail are required' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(userEmail)) {
      return new Response(JSON.stringify({ error: 'Invalid email format' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Validate pillar type
    const validPillarTypes = ['confidence', 'style', 'health'];
    if (!validPillarTypes.includes(pillarType)) {
      console.error('Invalid pillar type received:', pillarType, 'Expected one of:', validPillarTypes);
      return new Response(
        JSON.stringify({ 
          error: 'Invalid pillar type',
          details: `Pillar type '${pillarType}' is not valid. Must be one of: ${validPillarTypes.join(', ')}`
        }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    // Validate rating range
    if (rating < 1 || rating > 5) {
      return new Response(JSON.stringify({ error: 'Rating must be between 1 and 5' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Insert quiz submission into database
    const { data, error } = await supabase
      .from('quiz_submissions')
      .insert({
        pillar_type: pillarType,
        rating: rating,
        challenge: challenge || null,
        goals: goals || null,
        user_email: userEmail,
        user_name: userName || null,
      })
      .select()
      .single();

    if (error) {
      console.error('Database error:', error);
      return new Response(JSON.stringify({ error: 'Failed to save quiz submission' }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    console.log('Quiz submission saved:', data);

    return new Response(JSON.stringify({ 
      success: true, 
      message: 'Quiz submitted successfully',
      id: data.id 
    }), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in submit-quiz function:', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});