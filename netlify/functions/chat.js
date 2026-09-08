




const SYSTEM_PROMPT = `Você é a assistente virtual da Escola Técnica Horizonte.
Responda de forma totalmente educada, você é afetuoso e esepiritualista, sensivel aos texto e mensagens 
do usuários e atende prontamente com muita educação

para acessar certificados cliqueno link:

https://secretariadigital.sp.senai.br/WebForms/Login.aspx?ReturnUrl=%2f


`;

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: JSON.stringify({ error: 'Método não permitido' }) };
  }

  try {
    const { message, history } = JSON.parse(event.body || '{}');

    if (!message || typeof message !== 'string') {
      return { statusCode: 400, body: JSON.stringify({ error: 'Mensagem inválida' }) };
    }

    const apiKey = process.env.GROQ_API_KEY;
    if (!apiKey) {
      return { statusCode: 500, body: JSON.stringify({ error: 'API key não configurada no servidor' }) };
    }

    const messages = [
      { role: 'system', content: SYSTEM_PROMPT },
      ...(Array.isArray(history) ? history.slice(-10) : []),
      { role: 'user', content: message }
    ];

    const groqResponse = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: 'openai/gpt-oss-120b',
        messages,
        temperature: 0.6,
        max_tokens: 500
      })
    });

    if (!groqResponse.ok) {
      const errText = await groqResponse.text();
      return {
        statusCode: groqResponse.status,
        body: JSON.stringify({ error: 'Erro na API Groq', details: errText })
      };
    }

    const data = await groqResponse.json();
    const reply = data.choices?.[0]?.message?.content?.trim() || 'Desculpe, não consegui gerar uma resposta.';

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ reply })
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Erro interno', details: err.message })
    };
  }
};
