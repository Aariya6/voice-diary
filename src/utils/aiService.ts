interface PoetryResponse {
  reflection: string;
}

export async function generatePoeticReflection(
  emotion: string,
  theme: string,
  apiKey: string
): Promise<string> {
  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: 'You are a poetic AI that creates beautiful, short reflections about human emotions and experiences. Keep responses to exactly 2 sentences that capture the essence and beauty of the moment.',
          },
          {
            role: 'user',
            content: `Write a 2-sentence poetic reflection about a voice recording that expresses ${emotion} emotion and is about ${theme}. Make it beautiful, meaningful, and introspective.`,
          },
        ],
        max_tokens: 100,
        temperature: 0.8,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to generate poetry');
    }

    const data = await response.json();
    return data.choices[0]?.message?.content?.trim() || 'A moment captured, a memory preserved.';
  } catch (error) {
    console.error('Error generating poetry:', error);
    return 'In the whispers of your voice, emotions bloom like flowers in the garden of memory.';
  }
}

export async function synthesizeSpeech(
  text: string,
  apiKey: string
): Promise<string | null> {
  try {
    const response = await fetch('https://api.elevenlabs.io/v1/text-to-speech/21m00Tcm4TlvDq8ikWAM', {
      method: 'POST',
      headers: {
        'Accept': 'audio/mpeg',
        'xi-api-key': apiKey,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        text,
        model_id: 'eleven_monolingual_v1',
        voice_settings: {
          stability: 0.5,
          similarity_boost: 0.5,
        },
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to synthesize speech');
    }

    const audioBlob = await response.blob();
    return URL.createObjectURL(audioBlob);
  } catch (error) {
    console.error('Error synthesizing speech:', error);
    return null;
  }
}