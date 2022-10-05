export function capitalize(text: string | undefined) {
   if (text === undefined) return;
   return text.charAt(0).toUpperCase() + text.slice(1);
}