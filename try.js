const message1 =
  'Prompt validation failed: tempo: Tempo must be selected, key: Key must be selected';
const cleaned = message1.replace(/^Prompt validation failed:\s*/, '');
const parts = cleaned.split();
const messages = parts.map((p) => p.split(':'));

// console.log(message.split(','));
const result = messages[0]
  .map((str) => str.split(','))
  .flat()
  .map((s) => s.trim())
  .filter((s) => s.includes('must be selected'));
console.log(result.join(','));
