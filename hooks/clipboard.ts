import { useState } from 'react';

const useCopyToClipboard = () => {
  const [copiedText, setCopiedText] = useState('');

  const copyToClipboard = async (text: string) => {
    if (navigator?.clipboard) {
      try {
        await navigator.clipboard.writeText(text);
        setCopiedText(text);
      } catch (err) {
        setCopiedText('');
        console.error('Failed to copy text: ', err);
      }
    } else {
      // Fallback method for older browsers
      try {
        const textArea = document.createElement('textarea');
        textArea.value = text;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        textArea.remove();
        setCopiedText(text);
      } catch (err) {
        setCopiedText('');
        console.error('Failed to copy text: ', err);
      }
    }
  };

  return [copiedText, copyToClipboard] as const;
};

export default useCopyToClipboard;