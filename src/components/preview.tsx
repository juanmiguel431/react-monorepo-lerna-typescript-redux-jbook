import React, { useEffect, useRef } from 'react';
import './preview.css';

interface IPreviewProps {
  code: string;
  bundlingStatus: string;
}

const html = `
<html lang="en">
  <head>
    <title>Preview</title>
  </head>
  <body>
    <div id="root"></div>
    <script>
        const handleError = (e) => {
            const root = document.getElementById('root');
            root.innerHTML = '<div style="color: red;"><h4>Runtime error</h4>' + e + '</div>';
            console.error(e);
        };
        
        window.addEventListener('error', (event) => {
          event.preventDefault();
          handleError(event.error);
        });
    
        window.addEventListener('message', (event) => {
          try {
            eval(event.data);
          } catch (e) {
            handleError(e);
          }
        }, false);
    </script>
  </body>
</html>
`;

export const Preview: React.FC<IPreviewProps> = ({ code, bundlingStatus }) => {
  const iframe = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    if (!iframe.current) return;
    iframe.current.srcdoc = html;

    setTimeout(() => {
      if (!( iframe.current && iframe.current.contentWindow )) return;
      iframe.current.contentWindow.postMessage(code, '*');
    }, 100);

  }, [code]);

  return (
    <div className="preview-wrapper">
      <iframe
        title="Preview"
        ref={iframe}
        sandbox="allow-scripts allow-modals"
        srcDoc={html}
      />
      {bundlingStatus && <div className="preview-error">{bundlingStatus}</div>}
    </div>
  );
}

export default Preview;
